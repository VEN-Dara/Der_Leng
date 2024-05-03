import uuid
from django.db import models

from authentication.models import User

# Create your models here.

class PackageCategory (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    name = models.CharField(max_length=30)

    def __str__(self) -> str:
        return f'{self.name}'
    
    class Meta:
        db_table = 'tour_package_package_category'

class PackageCommission(models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    type = models.CharField(max_length=30, unique=True)
    percentage_of_sale_price = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)

    class Meta:
        db_table = 'tour_package_package_commission'
    
class Package (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    description = models.TextField()
    category = models.ForeignKey(PackageCategory, on_delete=models.SET_NULL, null=True, default=None)
    percentage_discount = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    tour_place_coordinate = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    video_url = models.CharField(max_length=255, null=True, blank=True)
    favorites = models.ManyToManyField(User, blank=True, related_name="package_favorites")
    commission = models.ForeignKey(PackageCommission, on_delete=models.SET_NULL, null=True, default=None)
    is_close = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f'{self.name}'
    
class PackageImage (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    package = models.ForeignKey(Package, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images/package_images/', max_length=500)
    type = models.CharField(max_length=30, default="normal", choices=[("normal","normal"), ("thumbnail","thumbnail"), ("cover","cover")])
    
    class Meta:
        db_table = 'tour_package_package_image'
    
class PackageSchedule (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    package = models.ForeignKey(Package, on_delete=models.CASCADE)
    destination = models.CharField(max_length=100)
    start_time = models.TimeField()
    end_time = models.TimeField()

    class Meta:
        db_table = 'tour_package_package_schedule'
    
class PackageService (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    detail = models.CharField(max_length=100)
    package = models.ForeignKey(Package, on_delete=models.CASCADE)
    price = models.IntegerField()
    currency = models.CharField(max_length=3, default="usd")
    is_close = models.BooleanField(default=False)

    class Meta:
        db_table = 'tour_package_package_service'

class PackageUnavailableDate(models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    package = models.ForeignKey(Package, on_delete=models.CASCADE)
    unavailable_at = models.DateField()

    class Meta:
        db_table = 'tour_package_package_unavailable_date'

    