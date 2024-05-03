# ===============================> Core Library <=====================================
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

# ===============================> Third Party <=====================================
import uuid

# ===============================> Local <=====================================
from authentication.models import User
from tour_package.models import Package, PackageService

# Create your models here.
class Cart(models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    service = models.ForeignKey(PackageService, on_delete=models.CASCADE)
    customer_amount = models.IntegerField()
    booking_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    
class Booking(models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    customer = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    total_price = models.IntegerField()
    currency = models.CharField(max_length=3, default="usd")
    created_at = models.DateTimeField(auto_now_add=True)

class BookingDetails(models.Model):
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

#====================================================> Review
class Review (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    package = models.ForeignKey(Package, on_delete=models.CASCADE)
    booking_details = models.ForeignKey(BookingDetails, on_delete=models.CASCADE)
    rating = models.IntegerField(
        validators=[
            MinValueValidator(0, message="Rating must be greater than or equal to 0."),
            MaxValueValidator(5, message="Rating must be less than or equal to 5.")
        ]
    )
    comment = models.TextField(default="",null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)