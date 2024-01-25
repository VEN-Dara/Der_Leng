import uuid
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

from authentication.models import User

# Create your models here.
#====================================================> User Info
class Guide_register_info(models.Model):
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
    tour_place_coordinate = models.CharField(max_length=30)

class Profile_image (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = image = models.ImageField(upload_to='images/profile_images', max_length=1000)
    type = models.CharField(max_length=50, default='profile', choices=(('profile', 'profile'), ('cover', 'cover'),))
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

#====================================================> Package Info

class Category (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    name = models.CharField(max_length=30)

class Commission(models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    type = models.CharField(max_length=30, unique=True)
    percentage_of_sale_price = models.FloatField()
    
class Package (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, default=None)
    discount = models.FloatField(default=0.00)
    tour_place_coordinate = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    video_url = models.CharField(max_length=255, null=True, blank=True)
    commission = models.ForeignKey(Commission, on_delete=models.SET_NULL, null=True, default=None)
    is_close = models.BooleanField(default=False)
    
class Package_image (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    package = models.ForeignKey(Package, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images/package_images/', max_length=500)
    
class Package_schedule (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    package = models.ForeignKey(Package, on_delete=models.CASCADE)
    destination = models.CharField(max_length=100)
    start_time = models.TimeField()
    end_time = models.TimeField()
    
class Package_service (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    detail = models.CharField(max_length=100)
    package = models.ForeignKey(Package, on_delete=models.CASCADE)
    price = models.FloatField()
    is_close = models.BooleanField(default=False)

class Package_unavailable_date(models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    package = models.ForeignKey(Package, on_delete=models.CASCADE)
    unavailable_at = models.DateField()
    
#====================================================> Payment
    
class Payment_method (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    type = models.CharField(max_length=30)
    holder_name = models.CharField(max_length=30)
    brand = models.CharField(max_length=30)
    last4 = models.CharField(max_length=4)
    customer_id = models.CharField(max_length=255)
    payment_method_id = models.CharField(max_length=255)
    exp_month = models.IntegerField()
    exp_year = models.IntegerField()
    
class Cart (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    service = models.ForeignKey(Package_service, on_delete=models.CASCADE)
    customer_ammount = models.IntegerField()
    booking_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    
class Booking (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    customer = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    total_price = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

class Booking_details(models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    card = models.ForeignKey(Cart, on_delete=models.SET_NULL, null=True, blank=True)
    booking = models.ForeignKey(Booking, on_delete=models.SET_NULL, null=True, blank=True)
    unit_price = models.FloatField()
    discount = models.FloatField(default=0)
    is_accepted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

class Customer_payments(models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    customer = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    booking = models.ForeignKey(Booking, on_delete=models.SET_NULL, null=True, blank=True)
    amount = models.FloatField()
    amount_received = models.FloatField()
    currency = models.CharField(max_length = 3)
    stripe_customer_id = models.CharField(max_length=255)
    stripe_payment_method_id = models.CharField(max_length=255)
    status = models.CharField(max_length=30)
    created = models.BigIntegerField()

class Seller_transactions(models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    seller = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    booking_details = models.ForeignKey(Booking_details, on_delete=models.SET_NULL, null=True, blank=True)
    commission = models.FloatField()
    amount = models.FloatField()
    amount_received = models.FloatField()
    currency = models.CharField(max_length=3)
    stripe_admin_account_id = models.CharField(max_length=255)
    stripe_payment_method_id = models.CharField(max_length=255)
    status = models.CharField(max_length=30)
    created = models.BigIntegerField()
    
class Review (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    package = models.ForeignKey(Package, on_delete=models.CASCADE)
    rating = models.IntegerField(
        validators=[
            MinValueValidator(0, message="Rating must be greater than or equal to 0."),
            MaxValueValidator(5, message="Rating must be less than or equal to 5.")
        ]
    )
    comment = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    
class Thumbnail (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    name = models.CharField(max_length=50)
    image = models.ImageField(upload_to='images/thumbnails/')