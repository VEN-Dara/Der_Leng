from authentication.serializers import UserSerializer
from .models import *
from rest_framework import serializers    
        
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
        
class BasicPackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Package
        fields = '__all__'

class PackageSerializer(serializers.ModelSerializer):
    package_service = Package_serviceSerializer(source='package_service_set', many=True, read_only=True)
    package_schedule = Package_scheduleSerializer(source='package_schedule_set', many=True, read_only=True)
    package_image = Package_imageSerializer(source='package_image_set', many=True, read_only=True)
    user = UserSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    class Meta:
        model = Package
        fields = '__all__'
        
class BasicPayment_methodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment_method
        exclude = ('payment_method_id', 'customer_id')

class Payment_methodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment_method
        fields = '__all__'
          
class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'
        
class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'
        
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'
        
class ThumbnailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thumbnail
        fields = '__all__'
