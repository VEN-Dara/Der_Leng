import uuid
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

from authentication.models import User

# Create your models here.
class Guide_register_info(models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    fullname_khmer = models.CharField(max_length=30)
    fullname_english = models.CharField(max_length=30)
    cv = models.FileField(upload_to='files/guide_register_info/')
    phone = models.CharField(max_length=20)
    address = models.CharField(max_length=255)
    tour_place_coordinate = models.CharField(max_length=30)

class Profile_image (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = image = models.ImageField(upload_to='images/profile_images')
    type = models.CharField(max_length=50, default='profile', choices=(('profile', 'profile'), ('cover', 'cover'),))
    is_active = models.BooleanField(default=True)
    created_at = models.TimeField(auto_now_add=True)

class Category (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    name = models.CharField(max_length=30)
    
class Package (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.TextField()
    category_id = models.ForeignKey(Category, on_delete=models.CASCADE)
    discount = models.FloatField()
    tour_place_coordinate = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    video_url = models.CharField(max_length=255)
    
class Package_image (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    package_id = models.ForeignKey(Package, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images/package_images/')
    
class Package_schedule (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    package_id = models.ForeignKey(Package, on_delete=models.CASCADE)
    destination = models.CharField(max_length=100)
    start_time = models.TimeField()
    end_time = models.TimeField()
    
class package_service (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    detail = models.CharField(max_length=100)
    package_id = models.ForeignKey(Package, on_delete=models.CASCADE)
    price = models.FloatField()

class package_unavailable_date(models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    package = models.ForeignKey(Package, on_delete=models.CASCADE)
    unavailable_at = models.DateTimeField()
    
class Payment_method (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    type = models.CharField(max_length=30)
    number = models.CharField(max_length=16, unique=True)
    holder_name = models.CharField(max_length=255)
    token = models.CharField(max_length=255, blank=True, null=True)
    # expiration_date = models.DateField()
    # cvv = models.CharField(max_length=3)

    def __str__(self):
        return f"Visa Card ending in {self.card_number[-4:]}"

    
class Cart (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    service = models.ForeignKey(package_service, on_delete=models.CASCADE)
    customer_ammount = models.IntegerField()
    booking_date = models.TimeField()
    created_at = models.TimeField(auto_now_add=True)
    
class Booking (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    cart_id = models.ForeignKey(Cart, on_delete=models.CASCADE)
    is_accept = models.BooleanField()
    created_at = models.TimeField(auto_now_add=True)
    
class Review (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    package_id = models.ForeignKey(Package, on_delete=models.CASCADE)
    rating = models.IntegerField(
        validators=[
            MinValueValidator(0, message="Rating must be greater than or equal to 0."),
            MaxValueValidator(5, message="Rating must be less than or equal to 5.")
        ]
    )
    comment = models.CharField(max_length=100)
    created_at = models.TimeField(auto_now_add=True)
    
class Thumbnail (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    name = models.CharField(max_length=50)
    image = models.ImageField(upload_to='images/thumbnails/')
    order_number = models.IntegerField()