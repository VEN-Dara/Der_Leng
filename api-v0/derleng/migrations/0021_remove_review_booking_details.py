# Generated by Django 5.0.1 on 2024-03-15 14:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('derleng', '0020_review_booking_details'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='review',
            name='booking_details',
        ),
    ]
