#=========================================> Django
from decimal import Decimal
from django.core.exceptions import ObjectDoesNotExist
from django.db import transaction
from django.utils import timezone

#=========================================> Python
import json
from django.forms import ValidationError

#=========================================> DRF
from django_filters.filters import Q
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, viewsets
from rest_framework.decorators import api_view, permission_classes
import stripe
from authentication.models import User
from authentication.permissions import IsAdmin, IsAdminOrStaffOrReadOnly, IsAdminOrStaffOrTourGuide, IsAdminOrStaffOrTourGuideOrReadOnly, IsStaff, IsTour_Guide, UserRolePermission
from booking.tasks import cancel_payment_task
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated , IsAuthenticatedOrReadOnly
from rest_framework.pagination import PageNumberPagination

#=========================================> Local
from booking.mixins import BookingMixin, calculate_charge_price
from booking.models import Booking, BookingDetails, Cart
from payment.models import PaymentMethod
from payment.mixins import create_payment_intent, create_refund, create_transfer
from booking.serializers import *
from payment.serializers import CustomerPaymentSerializer, SellerTransactionSerializer
from tour_package.models import Package, PackageService

class BookingPackageAPIView(APIView, BookingMixin):
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
            payment_inst = PaymentMethod.objects.get(pk=payment_method_id)
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
        
class BookingDetailsViewset(viewsets.ModelViewSet):
    queryset = BookingDetails.objects.all() 
    permission_classes = [IsAdminOrStaffOrReadOnly]
    serializer_class = BookingDetailsSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = '__all__'

class BookingDetailsAPIView(APIView, UserRolePermission):
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = '__all__'

    def get(self, request):
        user = request.user
        try:
            if self.is_admin(user=user) or self.is_staff(user=user):
                booking_details = BookingDetails.objects.all()
            elif self.is_tour_guide(user=user):
                booking_details = BookingDetails.objects.filter(cart__service__package__user=user)
            else :
                booking_details = BookingDetails.objects.filter(cart__user=user)
            
            return Response(BookingDetailsSerializer(booking_details, many=True).data, status=status.HTTP_200_OK)
        except Exception as error:
            return Response({"error": str(error)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAdminOrStaffOrTourGuideOrReadOnly])
def accept_booking(request, pk):
    try:
        booking_details = BookingDetails.objects.get(pk=pk)
        seller: User = booking_details.cart.service.package.user
        if seller.id != request.user.id:
            return Response({"error": "You are not the owner of this package."}, status=status.HTTP_403_FORBIDDEN)
        
        if booking_details.is_closed:
            return Response({"error": "Booking is already closed."}, status=status.HTTP_406_NOT_ACCEPTABLE)
        
        # if booking_details.is_accepted:
        #     return Response({"message": "Booking is already accepted."}, status=status.HTTP_204_NO_CONTENT)
        
        booking_details.is_accepted = True
        booking_details.save()

        destination = seller.paymentmethod_set.first().stripe_payment_method_id
        percentage_commission = Decimal(booking_details.cart.service.package.commission.percentage_of_sale_price)
        commission_price = Decimal(booking_details.unit_price) - ((Decimal(100.00) - percentage_commission) * booking_details.unit_price / Decimal(100.00))
        sale_price = (Decimal('100.00') - Decimal(booking_details.percentage_discount)) * Decimal(booking_details.unit_price) / Decimal('100.00')
        amount = int(sale_price - commission_price)

        currency = booking_details.booking.currency

        # ====================================>> Transfer money to tour-guide <<====================================
        # Unable to perform since we dont have tour-guide connect acc id
        # transfer = create_transfer(destination=destination, amount=amount, currency=currency)

        # transfer["seller"] = seller.id
        # transfer["booking_details"] = booking_details.id
        # transfer["commission"] = percentage_commission
        # transfer["amount_received"] = transfer.amount
        # transfer["amount"] = amount
        # transfer["payment_method"] = seller.paymentmethod_set.first().id
        # seller_transaction = store_seller_transaction(transfer)

        return Response({"message": "ការកក់បានយល់ព្រម"}, status=status.HTTP_200_OK)
    except Exception as error:
        return Response({"error": str(error)}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['PUT'])
@permission_classes([IsAdminOrStaffOrTourGuideOrReadOnly])
def reject_booking(request, pk):
    try:
        current_booking_details: BookingDetails = BookingDetails.objects.get(pk=pk)
        seller: User = current_booking_details.cart.service.package.user
        if seller.id != request.user.id:
            return Response({"error": "You are not the owner of this package."}, status=status.HTTP_403_FORBIDDEN)
        
        if current_booking_details.is_closed:
            return Response({"error": "Booking is already closed."}, status=status.HTTP_400_BAD_REQUEST)
        
        if current_booking_details.is_accepted:
            return Response({"message": "Booking is already accepted."}, status=status.HTTP_400_BAD_REQUEST)

        current_booking_details.is_closed = True
        current_booking_details.save()

        # ==========================>> Perform refund <<==========================
        # * Check booking that include all booking_detail to refund them at one
        # * Perform refund only if current booking_detail is the last reject
        booking: Booking = current_booking_details.booking

        # :: Check not reviewed booking ::
        not_review_booking_exist : bool = BookingDetails.objects.filter(Q(booking=booking) & Q(is_closed=False) & Q(is_accepted=False)).exists()
        # :: If no more all booking reviewed ::
        if(not not_review_booking_exist):
            rejected_booking_details = BookingDetails.objects.filter(Q(booking=booking) & Q(is_closed=True) & Q(is_accepted=False))
            refund_amount: Decimal = 0
            for bk in rejected_booking_details:
                charge_price = calculate_charge_price(bk.unit_price, bk.percentage_discount)
                refund_amount += charge_price * bk.cart.customer_amount

            #  :: Perform refund ::
            payment_intent: str = booking.customerpayment.payment_intent_id
            refund = create_refund(payment_intent, refund_amount)
            
            return Response({"message": refund}, status=status.HTTP_200_OK)

        # return Response({"message": refund}, status=status.HTTP_200_OK)
        return Response({"message": "ការកក់បានបដិសេធ និងបិទ"}, status=status.HTTP_200_OK)
    except Exception as error:
        return Response({"error": str(error)}, status=status.HTTP_400_BAD_REQUEST)

def store_seller_transaction(transfer):
    transfer["status"] = "success"
    serializer = SellerTransactionSerializer(data=transfer)
    serializer.is_valid(raise_exception=True)
    customer_refund = serializer.save()
    return customer_refund
        
class CartAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self , request):
        try:
            cartList = request.user.cart_set.filter(bookingdetails__isnull=True).distinct()
            serializer = MediumCartSerializer(cartList , many = True)
            
            return Response(serializer.data , status=status.HTTP_200_OK)
        except Exception as error:
            return Response( {'error' : str(error)} , status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        try:
            user = request.user
            data = request.data.copy()
            data['user'] = user.id
            serializers = CartSerializer(data=data)
            serializers.is_valid(raise_exception=True)
            serializers.save()

            response_data = {
                'message': 'Item added to cart successfully.',
                'cart_item_data': serializers.data
            }
            return Response(response_data, status=status.HTTP_200_OK)
        except Exception as error:
            return Response({'error': str(error)}, status=status.HTTP_404_NOT_FOUND)

    def put (self , request , pk ):
        try:
            cart_id = Cart.objects.get(pk=pk)
            serializer = CartSerializer(cart_id , data=request.data , partial = True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            
            respone_data = {
                'message' : 'Cart update Successfully',
                'data' : serializer.data
            }
            return Response(respone_data , status=status.HTTP_201_CREATED)
        except Exception as error:
            return Response( {'error' : str(error)} , status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self , request, pk):
        try:
            cart_id = Cart.objects.get(pk=pk)
            cart_id.delete()
            return Response({'Delete Successfully'} , status=status.HTTP_204_NO_CONTENT)
        except Cart.DoesNotExist:
            return Response({'error': 'Cart not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as error:
            return Response({'error': str(error)}, status=status.HTTP_400_BAD_REQUEST)
        
class ReviewAPIView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = PageNumberPagination
    page_size = 10

    def post(self  , request , *args, **kwargs):
        try:
            data = request.data.copy()
            data['user'] = request.user.id
            data['package'] = data['package_id']
            serializers = ReviewSerializer(data=data)
            serializers.is_valid(raise_exception=True)
            serializers.save()
            
            respone_data = {
                'message' : 'Review post successfully.' ,
                'review_data' : serializers.data
            }
            return Response( respone_data , status=status.HTTP_201_CREATED)
        
        except Exception as error:
            return Response( error.detail , status=status.HTTP_400_BAD_REQUEST)
        
    def get(self ,request):
        try:
            reviewList = Review.objects.all().order_by("-created_at")

            package_param = self.request.query_params.get("package", None)
            if package_param:
                reviewList = Review.objects.filter(package__id=package_param).order_by("-created_at")

            paginator = self.pagination_class()
            results = paginator.paginate_queryset(reviewList, request)
            serializers = ReviewSerializer(results , many = True)
            return paginator.get_paginated_response(serializers.data)
        except Exception as error:
            return Response( {'error' : str(error)} , status=status.HTTP_400_BAD_REQUEST)
        
    def put(self , request , pk):
        try:
            review_id = Review.objects.get(pk=pk)
            print(request.user)
            print(pk)
            
            serializers = ReviewSerializer(review_id, data=request.data ,partial = True)
            
            serializers.is_valid(raise_exception=True)
            serializers.save()
            respone_data = {
                    'message' : 'Review Update successfully.' ,
                    'review_data' : serializers.data
                }
            return Response( respone_data , status=status.HTTP_201_CREATED)
        except Exception as error:
            return Response( {'error' : str(error)} , status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self ,request ,  pk):
        try:
            review_id = Review.objects.get(pk=pk)
            print(pk)
            review_id.delete()
            return Response({'Delete Successfully'} , status=status.HTTP_204_NO_CONTENT)
        except Review.DoesNotExist:
            return Response({'error': 'Review not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as error:
            return Response({'error': str(error)}, status=status.HTTP_400_BAD_REQUEST)