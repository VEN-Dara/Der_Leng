# Generated by Django 5.0.1 on 2024-05-03 02:46

import django.db.models.deletion
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('booking', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='PaymentMethod',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('type', models.CharField(max_length=30)),
                ('holder_name', models.CharField(max_length=30)),
                ('brand', models.CharField(max_length=30)),
                ('last4', models.CharField(max_length=4)),
                ('stripe_customer_id', models.CharField(max_length=255)),
                ('stripe_payment_method_id', models.CharField(max_length=255)),
                ('exp_month', models.IntegerField()),
                ('exp_year', models.IntegerField()),
                ('is_active', models.BooleanField(default=True)),
                ('is_default', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='CustomerRefund',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('amount', models.IntegerField()),
                ('amount_refunded', models.IntegerField()),
                ('currency', models.CharField(max_length=3)),
                ('stripe_admin_account_id', models.CharField(max_length=255)),
                ('description', models.CharField(max_length=255)),
                ('status', models.CharField(max_length=30)),
                ('created', models.BigIntegerField()),
                ('BookingDetails', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='booking.bookingdetails')),
                ('customer', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
                ('payment_method', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='payment.paymentmethod')),
            ],
        ),
        migrations.CreateModel(
            name='CustomerPayment',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('amount', models.IntegerField()),
                ('amount_received', models.IntegerField()),
                ('currency', models.CharField(max_length=3)),
                ('status', models.CharField(max_length=30)),
                ('created', models.BigIntegerField()),
                ('booking', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='booking.booking')),
                ('customer', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
                ('payment_method', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='payment.paymentmethod')),
            ],
        ),
        migrations.CreateModel(
            name='SellerTransaction',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('commission', models.DecimalField(decimal_places=2, default=0.0, max_digits=5)),
                ('amount', models.IntegerField()),
                ('amount_received', models.IntegerField()),
                ('currency', models.CharField(max_length=3)),
                ('status', models.CharField(max_length=30)),
                ('created', models.BigIntegerField()),
                ('BookingDetails', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='booking.bookingdetails')),
                ('payment_method', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='payment.paymentmethod')),
                ('seller', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
