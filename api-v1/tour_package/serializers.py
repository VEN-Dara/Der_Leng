from django.db.models import Avg
from rest_framework import serializers

from core.settings.base import MEDIA_URL
from authentication.serializers import UserSerializer
from tour_package.models import Package, PackageCategory, PackageImage, PackageSchedule, PackageService, PackageUnavailableDate
        
class PackageScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = PackageSchedule
        fields = '__all__'
        # exclude = ('package',)
    
class PackageServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = PackageService
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["price"] = instance.price / 100 #Update from cent to dollar
        return data

class PackageImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PackageImage
        fields = '__all__'

class PackageUnavailableDateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PackageUnavailableDate
        fields = '__all__'
        
class PackageCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PackageCategory
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
        data['default_price'] = instance.packageservice_set.first().price / 100   #Update from cent to dollar
        data['schedule_place'] = instance.packageschedule_set.first().destination
        data['avg_rating'] = instance.review_set.all().aggregate(Avg("rating", default=0))['rating__avg']
        data['amount_rating'] = instance.review_set.count()
        data['favorite'] = False

        # Access user information from the request object
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            data['favorite'] = instance.favorites.filter(pk=request.user.id).exists()

        return data

class PackageSerializer(serializers.ModelSerializer):
    package_service = PackageServiceSerializer(source='packageservice_set', many=True, read_only=True)
    package_schedule = PackageScheduleSerializer(source='packageschedule_set', many=True, read_only=True)
    package_image = PackageImageSerializer(source='packageimage_set', many=True, read_only=True)
    user = UserSerializer(read_only=True)
    category = PackageCategorySerializer(read_only=True)
    class Meta:
        model = Package
        exclude = ('favorites',)

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
    thumbnail = instance.packageimage_set.filter(type='thumbnail').first()
    thumbnail_image = None
    if thumbnail:
        thumbnail_image = MEDIA_URL + str(thumbnail.image)
    
    return thumbnail_image