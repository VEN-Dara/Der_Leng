from django.db.models import Avg
from authentication.serializers import BasicUserSerializer, UserSerializer
from .models import *
from rest_framework import serializers
from backend.settings import MEDIA_URL 
        
class Profile_imageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile_image
        fields = '__all__'
        
class Package_scheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Package_schedule
        fields = '__all__'
        # exclude = ('package',)
    
class Package_serviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Package_service
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["price"] = instance.price / 100 #Update from cent to dollar
        return data

class Package_imageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Package_image
        fields = '__all__'

class Package_unavailable_dateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Package_unavailable_date
        fields = '__all__'
        
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

# =======================> Package Serializer <=======================
        
class BasicPackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Package
        fields = '__all__'

class SmallPackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Package
        fields = ('id', 'name', "percentage_discount")

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['thumbnail'] = get_thumbnail_image(instance)
        return data
    
class MediumPackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Package
        fields = ('id', 'name', 'address', 'percentage_discount','description')

    def to_representation(self, instance):
        data = super().to_representation(instance)

        data['thumbnail'] = get_thumbnail_image(instance)
        data['description'] = ' '.join(instance.description.split()[:40])
        data['user'] = {"id": instance.user.id, "fullname": instance.user.fullname}
        data['default_price'] = instance.package_service_set.first().price / 100   #Update from cent to dollar
        data['schedule_place'] = instance.package_schedule_set.first().destination
        data['avg_rating'] = instance.review_set.all().aggregate(Avg("rating", default=0))['rating__avg']
        data['amount_rating'] = instance.review_set.count()
        data['favorite'] = False

        # Access user information from the request object
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            data['favorite'] = instance.favorites.filter(pk=request.user.id).exists()

        return data

class PackageSerializer(serializers.ModelSerializer):
    package_service = Package_serviceSerializer(source='package_service_set', many=True, read_only=True)
    package_schedule = Package_scheduleSerializer(source='package_schedule_set', many=True, read_only=True)
    package_image = Package_imageSerializer(source='package_image_set', many=True, read_only=True)
    user = UserSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    class Meta:
        model = Package
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)

        data['avg_rating'] = instance.review_set.all().aggregate(Avg("rating", default=0))['rating__avg']
        data['amount_rating'] = instance.review_set.count()
        data['favorite'] = False

        # Access user information from the request object
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            data['favorite'] = instance.favorites.filter(pk=request.user.id).exists()
            
        return data

# =======================> Package Serializers Mixin <======================= 
        
def get_thumbnail_image(instance):
    thumbnail = instance.package_image_set.filter(type='thumbnail').first()
    thumbnail_image = None
    if thumbnail:
        thumbnail_image = MEDIA_URL + str(thumbnail.image)
    
    return thumbnail_image

# =======================> Payment Serializers <======================= 
        
class BasicPayment_methodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment_method
        exclude = ('stripe_payment_method_id', 'stripe_customer_id')

class Payment_methodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment_method
        fields = '__all__'

class Customer_paymentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer_payments
        fields = '__all__'

class Customer_refundsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer_refunds
        fields = '__all__'

class Seller_transactionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seller_transactions
        fields = '__all__'
          
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
        data['service'] = Package_serviceSerializer(service).data
        data["booking_details_id"] = None
        data["review"] = None

        booking_details = Booking_details.objects.filter(cart=instance).first()
        if booking_details:
            data["booking_details_id"] = booking_details.id
            review = Review.objects.filter(booking_details=booking_details).first()
            if review:
                data["review"] = BasicReviewSerializer(review).data

        return data

class Booking_detailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking_details
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
        cartList = Cart.objects.filter(booking_details__booking_id=instance.id)
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
        
class ThumbnailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thumbnail
        fields = '__all__'
