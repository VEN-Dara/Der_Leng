# Generated by Django 5.0.1 on 2024-01-31 17:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('derleng', '0007_payment_method_is_default'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='seller_transactions',
            name='stripe_admin_account_id',
        ),
    ]
