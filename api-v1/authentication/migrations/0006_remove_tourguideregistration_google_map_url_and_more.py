# Generated by Django 5.0.1 on 2024-06-27 08:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0005_alter_tourguideregistration_google_map_url'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tourguideregistration',
            name='google_map_url',
        ),
        migrations.AddField(
            model_name='tourguideregistration',
            name='location_url',
            field=models.URLField(default='https://km.wikipedia.org/wiki/', max_length=2000),
            preserve_default=False,
        ),
    ]