from decimal import Decimal

from django.db.models.functions import TruncDate
from django.forms import ValidationError
from django.utils import timezone
from django_filters.filters import Q
from authentication.models import User
from core.settings import base
from booking.tasks import cancel_payment_task
from booking.models import BookingDetails, Cart
from booking.serializers import BookingDetailsSerializer
from payment.serializers import CustomerPaymentSerializer
from telegrambot.handlers import send_message


class BookingMixin:
    def store_booking_details(self, carts, booking_id):
        total_price = 0
        for cart in carts:
            cart_id = cart["id"]
            cart_instance = Cart.objects.filter(pk=cart_id).first()
            print(cart_instance)

            if not cart_instance:
                raise Cart.DoesNotExist
            
            # :: Validate : preform delete other unbooking cart if daily_booking = 1 :: 
            booking_date = cart_instance.booking_date.date()
            service = cart_instance.service
            booking_count = BookingDetails.objects.annotate(
                booking_date_only=TruncDate('cart__booking_date')
                ).filter(
                    booking_date_only=booking_date, cart__service__id = service.id
                )
            
            if booking_count.count() >= cart_instance.service.package.max_daily_bookings:
                raise ValidationError("កាលបរិច្ឆេទដែលអ្នកចង់កក់មិននូវទំនេរទៀតទេ!")
            
            booking_details_data = {}
            booking_details_data["cart"] = cart_instance.id
            booking_details_data["booking"] = booking_id
            booking_details_data["unit_price"] = cart_instance.service.price
            booking_details_data["percentage_discount"] = cart_instance.service.package.percentage_discount

            serializer = BookingDetailsSerializer(data=booking_details_data)
            serializer.is_valid(raise_exception=True)
            booking_details_inst = serializer.save()
            discounted_price = (Decimal('100.00') - Decimal(booking_details_inst.percentage_discount)) * Decimal(booking_details_inst.unit_price) / Decimal('100.00')
            total_price = total_price + (discounted_price * cart_instance.customer_amount)

            #=========================================> Start Notificate Seller For Accept
            try:
                seller: User = cart_instance.service.package.user
                if(seller.telegram_account) :
                    telegram = seller.telegram_account
                    response = f'''
**កញ្ចប់ដំណើរកម្សាន្តរបស់អ្នកបានកក់៖** \n
**- កញ្ចប់ដំណើរកម្សាន្ត** : {cart_instance.service.package.name}
**- ជម្រើស** : {cart_instance.service.detail}
**- អ្នកទេសចរ** : {cart_instance.customer_amount} នាក់
**- កក់ថ្ងៃទី** : {cart_instance.booking_date.date()}
---------------------------------------------------------
សូមពិនិត្យ
                    '''
                    send_message("sendMessage", {
                        'chat_id': telegram.id,
                        'text': response,
                        'parse_mode': 'Markdown'
                    })
            except:
                print('An exception occurred')
                pass 

        return int(total_price)
    
    def store_customer_payment(self, user_id, booking_id, payment_method_id, payment_intent):
        customer_payment_data = {}
        customer_payment_data["customer"] = user_id
        customer_payment_data["booking"] = booking_id
        customer_payment_data["payment_method"] = payment_method_id
        customer_payment_data["payment_intent_id"] = payment_intent["id"]
        customer_payment_data["amount"] = payment_intent["amount"]
        customer_payment_data["amount_received"] = payment_intent["amount_received"]
        customer_payment_data["currency"] = payment_intent["currency"]
        customer_payment_data["status"] = payment_intent["status"]
        customer_payment_data["created"] = payment_intent["created"]
        
        serializer = CustomerPaymentSerializer(data=customer_payment_data)
        serializer.is_valid(raise_exception=True)
        customer_payment = serializer.save()
        return customer_payment
    
    def set_schedule_cancel_booking(self, customer_payment_id):
        # Calculate the time when the task should be executed (e.g., LIMIT_TIME_FOR_BOOKING_ACCEPT from now)
        execution_time = timezone.now() + timezone.timedelta(minutes=int(base.LIMIT_TIME_FOR_BOOKING_ACCEPT))
        cancel_payment_task.apply_async(args=[customer_payment_id], eta=execution_time)

def calculate_charge_price(unit_price, percentage_discount):
    return (Decimal('100.00') - Decimal(percentage_discount)) * Decimal(unit_price) / Decimal('100.00')

