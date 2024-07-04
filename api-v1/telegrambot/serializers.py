from rest_framework import serializers
from telegrambot.models import TelegramAccount

class TelegramAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = TelegramAccount
        fields = '__all__'

class BasicTelegramAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = TelegramAccount
        fields = ['id', 'first_name', 'last_name',  "username"]