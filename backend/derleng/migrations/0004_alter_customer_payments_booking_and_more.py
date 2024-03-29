# Generated by Django 5.0.1 on 2024-01-30 04:07

import django.db.models.deletion
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('derleng', '0003_remove_booking_details_discount_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer_payments',
            name='booking',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='derleng.booking'),
        ),
        migrations.AlterField(
            model_name='seller_transactions',
            name='booking_details',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='derleng.booking_details'),
        ),
        migrations.CreateModel(
            name='Customer_refunds',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('amount', models.IntegerField()),
                ('amount_refunded', models.IntegerField()),
                ('currency', models.CharField(max_length=3)),
                ('stripe_admin_account_id', models.CharField(max_length=255)),
                ('status', models.CharField(max_length=30)),
                ('created', models.BigIntegerField()),
                ('booking_details', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='derleng.booking_details')),
                ('customer', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
                ('payment_method', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='derleng.payment_method')),
            ],
        ),
    ]
