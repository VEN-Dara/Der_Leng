# Generated by Django 5.0.1 on 2024-03-15 14:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('derleng', '0018_remove_booking_details_review'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='review',
            name='booking_details',
        ),
    ]
