# Generated by Django 5.0.1 on 2024-06-18 17:10

import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tour_package', '0003_alter_packagecategory_table_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='PackageChargeType',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=30)),
            ],
            options={
                'db_table': 'tour_package_package_charge_type',
            },
        ),
        migrations.RemoveField(
            model_name='package',
            name='tour_place_coordinate',
        ),
        migrations.RemoveField(
            model_name='package',
            name='video_url',
        ),
        migrations.AddField(
            model_name='package',
            name='location_url',
            field=models.CharField(default='https://maps.app.goo.gl/2hoYZCqNFnW7yBh68', max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='package',
            name='max_daily_bookings',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='package',
            name='max_people',
            field=models.IntegerField(default=5),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='package',
            name='num_days',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='package',
            name='charge_type',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, to='tour_package.packagechargetype'),
        ),
    ]
