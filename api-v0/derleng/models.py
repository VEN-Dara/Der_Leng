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
    image = models.ImageField(upload_to='images/profile_images', max_length=1000)
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

    def __str__(self) -> str:
        return f'{self.name}'

class Commission(models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    type = models.CharField(max_length=30, unique=True)
    percentage_of_sale_price = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    
class Package (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, default=None)
    percentage_discount = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    tour_place_coordinate = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    video_url = models.CharField(max_length=255, null=True, blank=True)
    favorites = models.ManyToManyField(User, blank=True, related_name="package_favorites")
    commission = models.ForeignKey(Commission, on_delete=models.SET_NULL, null=True, default=None)
    is_close = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f'{self.name}'
    
class Package_image (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    package = models.ForeignKey(Package, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images/package_images/', max_length=500)
    type = models.CharField(max_length=30, default="normal", choices=[("normal","normal"), ("thumbnail","thumbnail"), ("cover","cover")])
    
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
    price = models.IntegerField()
    currency = models.CharField(max_length=3, default="usd")
    is_close = models.BooleanField(default=False)

class Package_unavailable_date(models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    package = models.ForeignKey(Package, on_delete=models.CASCADE)
    unavailable_at = models.DateField()
    
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
    stripe_customer_id = models.CharField(max_length=255)
    stripe_payment_method_id = models.CharField(max_length=255)
    exp_month = models.IntegerField()
    exp_year = models.IntegerField()
    is_active = models.BooleanField(default=True)
    is_default = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f'**** **** **** {self.last4}'
    
    def save(self, *args, **kwargs):
        Payment_method.objects.filter(user=self.user).update(is_default=False)
        
        if not self.is_default:
            self.is_default = True

        super().save(*args, **kwargs)
    
#====================================================> Booking Package
    
class Cart (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    service = models.ForeignKey(Package_service, on_delete=models.CASCADE)
    customer_amount = models.IntegerField()
    booking_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    
class Booking (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    customer = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    total_price = models.IntegerField()
    currency = models.CharField(max_length=3, default="usd")
    created_at = models.DateTimeField(auto_now_add=True)

class Booking_details(models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    cart = models.ForeignKey(Cart, on_delete=models.SET_NULL, null=True, blank=True)
    booking = models.ForeignKey(Booking, on_delete=models.SET_NULL, null=True, blank=True)
    unit_price = models.IntegerField()
    currency = models.CharField(max_length=3, default="usd")
    percentage_discount = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    is_accepted = models.BooleanField(default=False)
    is_closed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

#====================================================> Payment Record

class Customer_payments(models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    customer = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    booking = models.OneToOneField(Booking, on_delete=models.SET_NULL, null=True, blank=True)
    amount = models.IntegerField()
    amount_received = models.IntegerField()
    currency = models.CharField(max_length = 3)
    payment_method = models.ForeignKey(Payment_method, on_delete=models.SET_NULL, null=True, blank=True)
    status = models.CharField(max_length=30)
    created = models.BigIntegerField()

class Seller_transactions(models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    seller = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    booking_details = models.OneToOneField(Booking_details, on_delete=models.SET_NULL, null=True, blank=True)
    commission = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    amount = models.IntegerField()
    amount_received = models.IntegerField()
    currency = models.CharField(max_length=3)
    payment_method = models.ForeignKey(Payment_method, on_delete=models.SET_NULL, null=True, blank=True)
    status = models.CharField(max_length=30)
    created = models.BigIntegerField()

class Customer_refunds(models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    customer = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    booking_details = models.OneToOneField(Booking_details, on_delete=models.SET_NULL, null=True, blank=True)
    amount = models.IntegerField()
    amount_refunded = models.IntegerField()
    currency = models.CharField(max_length=3)
    stripe_admin_account_id = models.CharField(max_length=255)
    payment_method = models.ForeignKey(Payment_method, on_delete=models.SET_NULL, null=True, blank=True)
    description = models.CharField(max_length=255)
    status = models.CharField(max_length=30)
    created = models.BigIntegerField()
    
class Thumbnail (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    name = models.CharField(max_length=50)
    image = models.ImageField(upload_to='images/thumbnails/')

    def __str__(self) -> str:
        return f'{self.name}'
    
#====================================================> Review
class Review (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    package = models.ForeignKey(Package, on_delete=models.CASCADE)
    booking_details = models.ForeignKey(Booking_details, on_delete=models.CASCADE)
    rating = models.IntegerField(
        validators=[
            MinValueValidator(0, message="Rating must be greater than or equal to 0."),
            MaxValueValidator(5, message="Rating must be less than or equal to 5.")
        ]
    )
    comment = models.TextField(default="",null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    