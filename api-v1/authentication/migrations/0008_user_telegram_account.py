# Generated by Django 5.0.1 on 2024-07-02 13:03

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0007_tourguideregistration_created_at_and_more'),
        ('telegrambot', '0003_rename_last_message_telegramaccount_last_bot_message_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='telegram_account',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.SET_DEFAULT, to='telegrambot.telegramaccount'),
        ),
    ]
