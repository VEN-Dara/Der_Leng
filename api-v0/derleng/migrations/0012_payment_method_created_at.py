# Generated by Django 5.0.1 on 2024-02-09 06:20

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('derleng', '0011_rename_customer_ammount_cart_customer_amount'),
    ]

    operations = [
        migrations.AddField(
            model_name='payment_method',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]