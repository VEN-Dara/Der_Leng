from rest_framework import serializers
from django.db.models import Q

from .models import User, User_role
from derleng.models import Profile_image

class User_roleSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_role
        fields = '__all__'

class BasicUser_roleSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_role
        fields = ['id', 'name']

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    # def create(self, validate_data):
    #     user_obj = User.objects.create_user(username=validate_data['username'], password=validate_data['password'])
    #     user_obj.email = validate_data['email']
    #     user_obj.first_name = validate_data.get('first_name', '')
    #     user_obj.last_name = validate_data.get('first_name', '')
    #     user_obj.save()
    #     print(user_obj.role)
    #     print("user_obj.role")
    #     return user_obj
    
class UserSerializer(serializers.ModelSerializer):
    role = BasicUser_roleSerializer()
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'fullname', 'role']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        image = self.get_profile_images(instance)
        data.update(image)
        return data
    
    def get_profile_images(self, user):
        images = {'profile_image': None, 'cover_image': None}
        
        profile_image = Profile_image.objects.filter(Q(user=user) & Q(is_active=True) & Q(type='profile')).first()
        if profile_image:
            images['profile_image'] = profile_image.image.url 

        cover_image = Profile_image.objects.filter(Q(user=user) & Q(is_active=True) & Q(type='cover')).first()
        if cover_image:
            images['cover_image'] = cover_image.image.url
        return images
