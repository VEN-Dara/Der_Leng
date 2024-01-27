# Generated by Django 5.0.1 on 2024-01-26 19:40

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('derleng', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='payment_method',
            old_name='customer_id',
            new_name='stripe_customer_id',
        ),
        migrations.RenameField(
            model_name='payment_method',
            old_name='payment_method_id',
            new_name='stripe_payment_method_id',
        ),
        migrations.RemoveField(
            model_name='customer_payments',
            name='stripe_customer_id',
        ),
        migrations.RemoveField(
            model_name='customer_payments',
            name='stripe_payment_method_id',
        ),
        migrations.RemoveField(
            model_name='seller_transactions',
            name='stripe_payment_method_id',
        ),
        migrations.AddField(
            model_name='customer_payments',
            name='payment_method',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='derleng.payment_method'),
        ),
        migrations.AddField(
            model_name='seller_transactions',
            name='payment_method',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='derleng.payment_method'),
        ),
    ]