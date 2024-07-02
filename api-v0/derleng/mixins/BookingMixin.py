from decimal import Decimal

from django.utils import timezone
from backend import settings
from derleng.tasks import cancel_payment_task
from derleng.models import Cart
from derleng.serializers import Booking_detailsSerializer, Customer_paymentsSerializer


class BookingMixin:
    def store_booking_details(self, carts, booking_id):
        total_price = 0
        for cart in carts:
            cart_id = cart["id"]
            cart_instance = Cart.objects.filter(pk=cart_id).first()
            print(cart_instance)

            if not cart_instance:
                raise Cart.DoesNotExist
            
            booking_details_data = {}
            booking_details_data["cart"] = cart_instance.id
            booking_details_data["booking"] = booking_id
            booking_details_data["unit_price"] = cart_instance.service.price
            booking_details_data["percentage_discount"] = cart_instance.service.package.percentage_discount

            serializer = Booking_detailsSerializer(data=booking_details_data)
            serializer.is_valid(raise_exception=True)
            booking_details_inst = serializer.save()
            discounted_price = (Decimal('100.00') - Decimal(booking_details_inst.percentage_discount)) * Decimal(booking_details_inst.unit_price) / Decimal('100.00')
            total_price = total_price + (discounted_price * cart_instance.customer_amount)

            #=========================================> Start Notificate Seller For Accept

        return int(total_price)
    
    def store_customer_payment(self, user_id, booking_id, payment_method_id, payment_intent):
        customer_payment_data = {}
        customer_payment_data["customer"] = user_id
        customer_payment_data["booking"] = booking_id
        customer_payment_data["payment_method"] = payment_method_id
        customer_payment_data["id"] = payment_intent["id"]
        customer_payment_data["amount"] = payment_intent["amount"]
        customer_payment_data["amount_received"] = payment_intent["amount_received"]
        customer_payment_data["currency"] = payment_intent["currency"]
        customer_payment_data["status"] = payment_intent["status"]
        customer_payment_data["created"] = payment_intent["created"]
        
        serializer = Customer_paymentsSerializer(data=customer_payment_data)
        serializer.is_valid(raise_exception=True)
        customer_payment = serializer.save()
        return customer_payment
    
    def set_schedule_cancel_booking(self, customer_payment_id):
        # Calculate the time when the task should be executed (e.g., LIMIT_TIME_FOR_BOOKING_ACCEPT from now)
        execution_time = timezone.now() + timezone.timedelta(minutes=int(settings.LIMIT_TIME_FOR_BOOKING_ACCEPT))
        cancel_payment_task.apply_async(args=[customer_payment_id], eta=execution_time)

