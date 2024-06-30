# Generated by Django 5.0.1 on 2024-01-27 05:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('derleng', '0002_rename_customer_id_payment_method_stripe_customer_id_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='booking_details',
            name='discount',
        ),
        migrations.RemoveField(
            model_name='package',
            name='discount',
        ),
        migrations.AddField(
            model_name='booking',
            name='currency',
            field=models.CharField(default='usd', max_length=3),
        ),
        migrations.AddField(
            model_name='booking_details',
            name='currency',
            field=models.CharField(default='usd', max_length=3),
        ),
        migrations.AddField(
            model_name='booking_details',
            name='percentage_discount',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=5),
        ),
        migrations.AddField(
            model_name='package',
            name='percentage_discount',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=5),
        ),
        migrations.AddField(
            model_name='package_image',
            name='type',
            field=models.CharField(choices=[('normal', 'normal'), ('thumbnail', 'thumbnail'), ('cover', 'cover')], default='normal', max_length=30),
        ),
        migrations.AddField(
            model_name='package_service',
            name='currency',
            field=models.CharField(default='usd', max_length=3),
        ),
        migrations.AddField(
            model_name='payment_method',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='booking',
            name='total_price',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='booking_details',
            name='unit_price',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='commission',
            name='percentage_of_sale_price',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=5),
        ),
        migrations.AlterField(
            model_name='customer_payments',
            name='amount',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='customer_payments',
            name='amount_received',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='package_service',
            name='price',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='seller_transactions',
            name='amount',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='seller_transactions',
            name='amount_received',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='seller_transactions',
            name='commission',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=5),
        ),
    ]