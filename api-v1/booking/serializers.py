from rest_framework import serializers

from authentication.serializers import BasicUserSerializer
from booking.models import Booking, BookingDetails, Cart, Review
from tour_package.serializers import PackageServiceSerializer, SmallPackageSerializer
 
# =======================> Booking & Cart Serializers <======================= 
class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'

class MediumCartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)

        service = instance.service
        package = service.package
        data['package'] = SmallPackageSerializer(package).data
        data['service'] = PackageServiceSerializer(service).data
        data["booking_details_id"] = None
        data["review"] = None

        booking_details = BookingDetails.objects.filter(cart=instance).first()
        if booking_details:
            data["booking_details_id"] = booking_details.id
            review = Review.objects.filter(booking_details=booking_details).first()
            if review:
                data["review"] = BasicReviewSerializer(review).data

        return data

class BookingDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingDetails
        fields = '__all__'

        
class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'
    
class MediumBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['id', 'customer', 'total_price', 'currency', 'created_at']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        cartList = Cart.objects.filter(bookingdetails__booking_id=instance.id)
        data['total_price'] = instance.total_price / 100
        data["carts"] = MediumCartSerializer(cartList, many=True).data
        return data
        
class BasicReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["user"] = BasicUserSerializer(instance.user).data
        return data