import uuid
from django.db import models

from authentication.models import User
from booking.models import Booking, BookingDetails

# Create your models here.
    
class PaymentMethod(models.Model):
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
        PaymentMethod.objects.filter(user=self.user).update(is_default=False)
        
        if not self.is_default:
            self.is_default = True

        super().save(*args, **kwargs)


#====================================================> Payment Record

class CustomerPayment(models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    customer = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    booking = models.OneToOneField(Booking, on_delete=models.SET_NULL, null=True, blank=True)
    amount = models.IntegerField()
    amount_received = models.IntegerField()
    currency = models.CharField(max_length = 3)
    payment_method = models.ForeignKey(PaymentMethod, on_delete=models.SET_NULL, null=True, blank=True)
    status = models.CharField(max_length=30)
    created = models.BigIntegerField()

class SellerTransaction(models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    seller = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    BookingDetails = models.OneToOneField(BookingDetails, on_delete=models.SET_NULL, null=True, blank=True)
    commission = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    amount = models.IntegerField()
    amount_received = models.IntegerField()
    currency = models.CharField(max_length=3)
    payment_method = models.ForeignKey(PaymentMethod, on_delete=models.SET_NULL, null=True, blank=True)
    status = models.CharField(max_length=30)
    created = models.BigIntegerField()

class CustomerRefund(models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    customer = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    BookingDetails = models.OneToOneField(BookingDetails, on_delete=models.SET_NULL, null=True, blank=True)
    amount = models.IntegerField()
    amount_refunded = models.IntegerField()
    currency = models.CharField(max_length=3)
    stripe_admin_account_id = models.CharField(max_length=255)
    payment_method = models.ForeignKey(PaymentMethod, on_delete=models.SET_NULL, null=True, blank=True)
    description = models.CharField(max_length=255)
    status = models.CharField(max_length=30)
    created = models.BigIntegerField()