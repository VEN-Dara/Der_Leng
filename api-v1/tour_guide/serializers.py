# ===============================> Core Library <=====================================
from rest_framework import serializers

# ===============================> Third Party <=====================================

# ===============================> Local <=====================================
from authentication.models import TourGuideRegistration
from booking.models import BookingDetails
from tour_package.serializers import SmallPackageSerializer

class AcceptBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingDetails
        fields = '__all__'
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        booking_detail: BookingDetails = instance
        package = booking_detail.cart.service.package
        data['tour_package'] = SmallPackageSerializer(package).data
        data['customer_amount'] = booking_detail.cart.customer_amount
        data['total_price'] = (100 - booking_detail.percentage_discount) / 100 * booking_detail.unit_price * booking_detail.cart.customer_amount / 100
        data['booking_date'] = booking_detail.cart.booking_date
        data['service_name'] = booking_detail.cart.service.detail
        data['user'] = {
            "id": booking_detail.cart.user.id,
            "fullname": booking_detail.cart.user.fullname,
        }
        return data
    
class TourGuideRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = TourGuideRegistration
        fields = '__all__'