#=========================================> Django
from decimal import Decimal
from django.core.exceptions import ObjectDoesNotExist

#=========================================> DRF
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

#=========================================> Library plugins
from django_filters.rest_framework import DjangoFilterBackend

#=========================================> Local
from authentication.permissions import IsAdminOrStaffOrReadOnly, IsAdminOrStaffOrTourGuideOrReadOnly
from derleng.mixins.Payment_methodMixin import create_transfer
from derleng.models import Booking_details
from derleng.serializers import Booking_detailsSerializer, Seller_transactionsSerializer
from authentication.permissions import UserRolePermission

class BookingDetailsViewset(viewsets.ModelViewSet):
    queryset = Booking_details.objects.all() 
    permission_classes = [IsAdminOrStaffOrReadOnly]
    serializer_class = Booking_detailsSerializer
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
                booking_details = Booking_details.objects.all()
            elif self.is_tour_guide(user=user):
                booking_details = Booking_details.objects.filter(cart__service__package__user=user)
            else :
                booking_details = Booking_details.objects.filter(cart__user=user)
            
            return Response(Booking_detailsSerializer(booking_details, many=True).data, status=status.HTTP_200_OK)
        except Exception as error:
            return Response({"error": str(error)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAdminOrStaffOrTourGuideOrReadOnly])
def accept_booking(request, pk):
    booking_details = None
    request_data = request.data.copy()
    try:
        booking_details = Booking_details.objects.get(pk=pk)
    except ObjectDoesNotExist as error:
        return Response({"error": str(error)}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        seller = booking_details.cart.service.package.user
        if seller.id != request.user.id:
            return Response({"error": "You are not the owner of this package."}, status=status.HTTP_403_FORBIDDEN)
        
        if booking_details.is_closed:
            return Response({"error": "Booking is already closed."}, status=status.HTTP_406_NOT_ACCEPTABLE)
        
        # if booking_details.is_accepted:
        #     return Response({"message": "Booking is already accepted."}, status=status.HTTP_204_NO_CONTENT)
        
        booking_details.is_accepted = True
        booking_details.save()

        destination = seller.payment_method_set.first().stripe_payment_method_id
        percentage_commission = Decimal(booking_details.cart.service.package.commission.percentage_of_sale_price)
        commission_price = Decimal(booking_details.unit_price) - ((Decimal(100.00) - percentage_commission) * booking_details.unit_price / Decimal(100.00))
        sale_price = (Decimal('100.00') - Decimal(booking_details.percentage_discount)) * Decimal(booking_details.unit_price) / Decimal('100.00')
        amount = int(sale_price - commission_price)

        currency = booking_details.booking.currency

        transfer = create_transfer(destination=destination, amount=amount, currency=currency)

        transfer["seller"] = seller.id
        transfer["booking_details"] = booking_details.id
        transfer["commission"] = percentage_commission
        transfer["amount_received"] = transfer.amount
        transfer["amount"] = amount
        transfer["payment_method"] = seller.payment_method_set.first().id
        seller_transaction = store_seller_transaction(transfer)

        return Response(Seller_transactionsSerializer(seller_transaction).data, status=status.HTTP_200_OK)
    except Exception as error:
        return Response({"error": str(error)}, status=status.HTTP_400_BAD_REQUEST)

def store_seller_transaction(transfer):
    transfer["status"] = "success"
    serializer = Seller_transactionsSerializer(data=transfer)
    serializer.is_valid(raise_exception=True)
    customer_refund = serializer.save()
    return customer_refund





    

    

    

    

