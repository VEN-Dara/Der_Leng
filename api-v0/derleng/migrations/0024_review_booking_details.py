# Generated by Django 5.0.1 on 2024-03-15 14:41

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('derleng', '0023_remove_review_booking_details'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='booking_details',
            field=models.ForeignKey(default='f49cc243-0f2d-4856-9ae4-14c8d47725c3', on_delete=django.db.models.deletion.CASCADE, to='derleng.booking_details'),
            preserve_default=False,
        ),
    ]
