# Generated by Django 5.0.1 on 2024-03-15 14:14

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('derleng', '0015_alter_review_comment'),
    ]

    operations = [
        migrations.AddField(
            model_name='booking_details',
            name='review',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='derleng.review'),
        ),
    ]
