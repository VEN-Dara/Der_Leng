import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser

from telegrambot.models import TelegramAccount

# Create your models here.

class User_role (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    name = models.CharField(max_length=20, unique=True)
    description = models.CharField(max_length=50)

    def __str__(self) -> str:
        return f'{self.name}'

class User(AbstractUser):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    fullname = models.CharField(max_length=60)
    role = models.ForeignKey(User_role, on_delete=models.SET_DEFAULT, default=None, null=True, blank=True)
    telegram_account = models.ForeignKey(TelegramAccount, on_delete=models.SET_NULL, default=None, null=True, blank=True)
    phone = models.CharField(max_length=15)
    profileImage = models.ImageField(upload_to='images/profile_images', null=True, blank=True)
    coverImage = models.ImageField(upload_to='images/profile_images', null=True, blank=True)
    registration_method = models.CharField(max_length=10, default='email',
        choices=(
        ('email', 'email'),
        ('google', 'google'),
        ('facebook', 'facebook'),
    ))

    def save(self, *args, **kwargs):
        default_role, created = User_role.objects.get_or_create(name='customer')
        
        if not self.role:
            self.role = default_role

        super().save(*args, **kwargs)

class TourGuideRegistration(models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    fullname_khmer = models.CharField(max_length=30)
    fullname_english = models.CharField(max_length=30)
    cv = models.FileField(upload_to='files/guide_register_info/', max_length=1000)
    phone = models.CharField(max_length=20)
    address = models.CharField(max_length=255)
    location_url = models.URLField(max_length=2000)
    is_reviewed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)