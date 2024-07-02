# tasks.py
from decimal import Decimal
from celery import shared_task
import stripe
from django.utils import timezone

from backend.settings import STRIPE_SECRET_KEY
from derleng.mixins.Payment_methodMixin import create_transfer
from derleng.models import Customer_payments
from derleng.serializers import Customer_refundsSerializer

stripe.api_key = STRIPE_SECRET_KEY

@shared_task
def cancel_payment_task(customer_payment_id):
    try:
        customer_payment = Customer_payments.objects.get(pk=customer_payment_id)
        booking = customer_payment.booking
        list_booking_details = booking.booking_details_set.filter(is_accepted=False)

        for booking_details in list_booking_details:
            charged_price = (Decimal('100.00') - Decimal(booking_details.percentage_discount)) * Decimal(booking_details.unit_price) / Decimal('100.00')
            destination = customer_payment.payment_method.stripe_customer_id
            currency = booking_details.currency

            transfer = create_transfer(destination=destination, amount=charged_price, currency=currency)

            transfer["customer"] = booking.customer.id
            transfer["booking_details"] = booking_details.id
            transfer["payment_method"] = customer_payment.payment_method.id
            transfer["description"] = "Customer Refund : Tour Guide is not accept booking in limit time."
            store_customer_refund(transfer)

            booking_details.is_closed = True
            booking_details.save()

            print(f"Successfully refund for {booking_details.id}")

        return booking
    except stripe.error.StripeError as e:
        print(f"Stripe error: {e}")
        return None
    
def store_customer_refund(transfer):
    customer_refund_data = {}
    # customer_refund_data["customer"] = transfer["customer"]customer_id
    # customer_refund_data["booking_details"] = booking_details_id
    # customer_refund_data["payment_method"] = payment_method_id
    # customer_refund_data["id"] = transfer["id"]
    # customer_refund_data["amount"] = transfer["amount"]
    # customer_refund_data["currency"] = transfer["currency"]
    # customer_refund_data["description"] = transfer["description"]
    # customer_refund_data["created"] = transfer["created"]
    
    transfer["status"] = "success"
    serializer = Customer_refundsSerializer(data=transfer)
    serializer.is_valid(raise_exception=True)
    customer_refund = serializer.save()
    return customer_refund
