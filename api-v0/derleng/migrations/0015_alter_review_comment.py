# Generated by Django 5.0.1 on 2024-03-15 06:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('derleng', '0014_alter_review_comment'),
    ]

    operations = [
        migrations.AlterField(
            model_name='review',
            name='comment',
            field=models.TextField(blank=True, default='', null=True),
        ),
    ]
