from django.shortcuts import render
from django.utils import timezone
from django_filters.filters import Q
from rest_framework import status, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from authentication.models import TourGuideRegistration, User, User_role
from authentication.permissions import IsAdminOrStaff
from booking.models import BookingDetails
from staff.serializers import TourGuideRegistrationSerializer
from tour_package.models import Package

# Create your views here.

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminOrStaff])
def get_dashboard(request):
    """
    Dashboard of tour_guide
    """
    try:
        user: User = request.user

        # get total package
        package_number: int = Package.objects.filter(Q(is_close=False)).count()
        print(package_number)
        total_booking: int = BookingDetails.objects.filter().count()

        # ======================>> monthly_income <<=========================
        monthly_income: int = 0

        #Calculate start and end date for current month
        current_date = timezone.now()
        start_of_month = current_date.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        end_of_month = start_of_month.replace(month=start_of_month.month + 1, day=1) - timezone.timedelta(days=1)

        booking_this_month = BookingDetails.objects.filter(
            created_at__gte=start_of_month,
            created_at__lte=end_of_month
            )
        
        for booking_detail in booking_this_month:
            # :: Find unit price after discount ::
            discounted_price = (100 - booking_detail.percentage_discount) / 100 * booking_detail.unit_price

            # Multiply by costomer qty then convert cent to dollar
            monthly_income += discounted_price * booking_detail.cart.customer_amount / 100

        # ======================>> total_income <<=========================
        total_income: int = 0
        booking_this_month = BookingDetails.objects.filter()
        
        for booking_detail in booking_this_month:
            # :: Find unit price after discount ::
            discounted_price = (100 - booking_detail.percentage_discount) / 100 * booking_detail.unit_price

            # Multiply by costomer qty then convert cent to dollar
            total_income += discounted_price * booking_detail.cart.customer_amount / 100

        return Response({
            "total_package": package_number,
            "total_booking": total_booking,
            "monthly_income": monthly_income,
            "total_income": total_income,
        }, status=status.HTTP_200_OK)
    except Exception as error:
        return Response( {'error' : str(error)} , status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['Post'])
@permission_classes([IsAuthenticated, IsAdminOrStaff])
def assign_tour_guide(request, register_id):
    try:
        register: TourGuideRegistration = TourGuideRegistration.objects.get(id=register_id)
        user: User = register.user
        role: User_role = User_role.objects.get(name='tour_guide')

        # :: update user role ::
        user.role = role
        user.save()

        # :: update reviewed ::
        register.is_reviewed = True
        register.save()
        return Response({'message': 'កំណត់អ្នកប្រើប្រាស់ជាមគ្គុទ្ទេសក៍ទេសចរណ៍ដោយជោគជ័យ'}, status=status.HTTP_200_OK)
    except Exception as error:
        return Response( {'error' : str(error)} , status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['Post'])
@permission_classes([IsAuthenticated, IsAdminOrStaff])
def reject_tour_guide(request, register_id):
    try:
        register: TourGuideRegistration = TourGuideRegistration.objects.get(id=register_id)

        # :: update reviewed ::
        register.is_reviewed = True
        register.save()
        return Response({'message': 'បដិសេធអ្នកប្រើប្រាស់ជាមគ្គុទ្ទេសក៍ទេសចរណ៍ដោយជោគជ័យ'}, status=status.HTTP_200_OK)
    except Exception as error:
        return Response( {'error' : str(error)} , status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['Post'])
@permission_classes([IsAuthenticated, IsAdminOrStaff])
def remove_tour_guide(request, user_id):
    try:
        user: User = User.objects.get(id= user_id)
        role: User_role = User_role.objects.get(name='customer')

        # :: update user role ::
        user.role = role
        user.save()
        return Response({'message': 'ដកអ្នកប្រើប្រាស់ចេញពីមគ្គុទ្ទេសក៍ទេសចរណ៍ដោយជោគជ័យ'}, status=status.HTTP_200_OK)
    except Exception as error:
        return Response( {'error' : str(error)} , status=status.HTTP_400_BAD_REQUEST)
    
class TourGuideRegistrationViewSet(viewsets.ModelViewSet):
    queryset = TourGuideRegistration.objects.all()
    serializer_class = TourGuideRegistrationSerializer
    permission_classes = [IsAdminOrStaff]

    def get_queryset(self):
        return super().get_queryset().filter(is_reviewed=False).order_by('created_at')

    def get_permissions(self):
        if self.request.method in ['PUT', 'POST']:
            self.permission_classes = [IsAuthenticated]
        elif self.request.method in ['GET', 'DELETE']:
            self.permission_classes = [IsAdminOrStaff]
        return super().get_permissions()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Check if the cv field is a PDF file or an image
        cv_file = request.FILES.get('cv')
        if cv_file:
            if not cv_file.name.endswith(('.pdf', '.jpg', '.jpeg', '.png')):
                return Response(
                    {'error': 'CV must be a PDF file or an image (jpg, jpeg, png).'},
                    status=status.HTTP_400_BAD_REQUEST
                )

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
