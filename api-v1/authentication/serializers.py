from rest_framework import serializers
from django.db.models import Q

from authentication.validations import is_valid_password

from .models import TourGuideRegistration, User, User_role

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

    def create(self, validate_data):

        user_obj = User.objects.create_user(username=validate_data['username'], password=validate_data['password'])
        user_obj.email = validate_data['email']
        user_obj.first_name = validate_data.get('first_name', '')
        user_obj.last_name = validate_data.get('last_name', '')
        user_obj.fullname = validate_data.get('fullname', '')
        user_obj.phone = validate_data.get('phone', '')
        user_obj.save()
        return user_obj
    
class BasicUserSerializer(serializers.ModelSerializer):
    role = BasicUser_roleSerializer()
    class Meta:
        model = User
        fields = ['id', 'fullname', 'role',  "profileImage"]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        return data
    
class UserSerializer(serializers.ModelSerializer):
    role = BasicUser_roleSerializer()
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'fullname', "phone", 'role', "profileImage", "coverImage"]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        return data
    
class SetPasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True, required=True)
    password = serializers.CharField(write_only=True, required=True)
    confirm_password = serializers.CharField(write_only=True, required=True)

    def validate(self, data):
        if not is_valid_password(data['password']):
            raise serializers.ValidationError({"password": "Your password must be at least 8 charectors long, one letter and one digit."})
        
        return data
