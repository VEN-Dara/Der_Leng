from rest_framework import serializers
from telegrambot.models import TelegramAccount

class TelegramAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = TelegramAccount
        fields = '__all__'