from django.shortcuts import render
from django.utils import timezone
from django_filters.filters import Q
from django_filters.rest_framework import DjangoFilterBackend
from django_seed.guessers import Avg, Count
from rest_framework import filters, status, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from authentication.models import TourGuideRegistration, User
from authentication.permissions import IsAdminOrStaffOrTourGuide, IsAdminOrStaffOrTourGuideOrReadOnly
from booking.models import BookingDetails, Review
from booking.serializers import BookingDetailsSerializer, ReviewSerializer
from tour_guide.serializers import AcceptBookingSerializer, TourGuideRegistrationSerializer
from tour_package.models import Package
from tour_package.serializers import MediumPackageSerializer


class PackageViewSet(viewsets.ModelViewSet):
    queryset = Package.objects.all()
    serializer_class = MediumPackageSerializer
    permission_classes = [IsAdminOrStaffOrTourGuide]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = '__all__'
    ordering_fields = ['created_at', 'avg_rating', 'amount_rating']
    search_fields = ["name", "description", "packageservice__detail", "packageschedule__destination", "address"]

    def get_queryset(self):
        queryset = super().get_queryset().filter(user=self.request.user)

        category_name = self.request.query_params.get('category_name')
        if category_name:
            queryset = queryset.filter(category__name=category_name)

        queryset = queryset.annotate(avg_rating=Avg('review__rating'), amount_rating=Count('review'))
        return queryset

# Create your views here.
@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminOrStaffOrTourGuide])
def get_dashboard(request):
    """
    Dashboard of tour_guide
    """
    try:
        user: User = request.user

        # get total package
        package_number: int = Package.objects.filter(user=user).count()
        total_booking: int = BookingDetails.objects.filter(cart__service__package__user=user).count()

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
    
@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminOrStaffOrTourGuide])
def get_accept_booking(request, type):
    try:
        user: User = request.user
        if(type=='new') :
            accept_bookings = BookingDetails.objects.filter(Q(is_accepted=False) & Q(is_closed=False) & Q(cart__service__package__user = user))
        else:
            accept_bookings = BookingDetails.objects.filter(Q(is_accepted=True) & Q(cart__service__package__user = user))

        response = AcceptBookingSerializer(accept_bookings, many=True)
        return Response(response.data, status=status.HTTP_200_OK)
    except Exception as error:
        return Response( {'error' : str(error)} , status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminOrStaffOrTourGuide])
def get_reviews(request):
    try:
        reviewList = Review.objects.filter(booking_details__cart__service__package__user = request.user).order_by("-created_at")

        paginator = PageNumberPagination()
        results = paginator.paginate_queryset(reviewList, request)
        serializers = ReviewSerializer(results , many = True)
        return paginator.get_paginated_response(serializers.data)
    except Exception as error:
        return Response( {'error' : str(error)} , status=status.HTTP_400_BAD_REQUEST)
    
class TourGuideRegistrationViewSet(viewsets.ModelViewSet):
    queryset = TourGuideRegistration.objects.all()
    serializer_class = TourGuideRegistrationSerializer

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