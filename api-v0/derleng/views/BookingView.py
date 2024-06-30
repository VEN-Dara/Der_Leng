#=========================================> Django
from django.db import transaction

#=========================================> Python
import json
from django.forms import ValidationError
from django.utils import timezone

#=========================================> DRF
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from derleng.tasks import cancel_payment_task

#=========================================> Local
from derleng.mixins import BookingMixin
from derleng.models import Booking, Payment_method
from derleng.mixins.Payment_methodMixin import create_payment_intent
from derleng.serializers import BookingSerializer, Customer_paymentsSerializer, MediumBookingSerializer

class BookingPackageAPIView(APIView, BookingMixin.BookingMixin):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            bookingList = request.user.booking_set.all().order_by("-created_at")
            return Response(MediumBookingSerializer(bookingList, many=True).data, status=status.HTTP_200_OK)
        except Exception as error:
            return Response({"errors": str(error)}, status=status.HTTP_404_NOT_FOUND)

    @transaction.atomic
    def post(self, request):
        try:
            request_data = request.data.copy()
            user_instance = request.user
            booking_instance = Booking.objects.create(customer=user_instance, total_price=0, currency="usd")

            payment_method_id = request_data.get("payment_method", "")
            if not payment_method_id:
                raise ValidationError({"payment_method": "Payment_method's id is rerequired."})

            carts = json.loads(request_data.get("carts", "[]"))
            if not carts:
                raise ValidationError({"carts": "Cart is rerequired."})
            
            total_price = self.store_booking_details(carts=carts, booking_id=booking_instance.id)
            booking_instance.total_price = total_price
            booking_instance.save()

            #================================> Start Charge for customer
            payment_inst = Payment_method.objects.get(pk=payment_method_id)
            payment_intent = create_payment_intent(payment_inst.stripe_customer_id, payment_inst.stripe_payment_method_id, total_price, currency="usd")

            customer_payment_instance = self.store_customer_payment(user_instance.id, booking_instance.id, payment_inst.id, payment_intent)

            #================================> Send Charge back to customer if seller not accept
            # self.set_schedule_cancel_booking(customer_payment_id=customer_payment_instance.id)

            response = {
                "status": "succeeded",
                "message": "booking successfully.",
            }

            return Response(response, status=status.HTTP_200_OK)
        except Exception as errors:
            transaction.set_rollback(True)
            return Response({"errors": str(errors)}, status=status.HTTP_400_BAD_REQUEST)