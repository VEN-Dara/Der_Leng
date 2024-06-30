from rest_framework import serializers

from authentication.models import TourGuideRegistration
from authentication.serializers import BasicUserSerializer


class TourGuideRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = TourGuideRegistration
        fields = '__all__'
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['email'] = instance.user.email
        data['profile_image'] = '/media/' + str(instance.user.profileImage)
        return data