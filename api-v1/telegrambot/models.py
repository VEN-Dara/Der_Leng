import uuid
from django.db import models

# Create your models here.
class TelegramAccount(models.Model):
    id = models.BigIntegerField(primary_key=True)
    first_name = models.CharField(max_length=255, null=True, blank=True)
    last_name = models.CharField(max_length=255, null=True, blank=True)
    username = models.CharField(max_length=255, null=True, blank=True)
    type = models.CharField(max_length=20, null=True, blank=True)
    last_bot_message = models.TextField(null=True, blank=True, default="")
    last_user_response = models.TextField(null=True, blank=True, default="")

    def __str__(self):
        return self.username