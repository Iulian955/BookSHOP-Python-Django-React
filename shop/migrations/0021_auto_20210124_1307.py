# Generated by Django 3.1.5 on 2021-01-24 21:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0020_auto_20210114_1914'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, upload_to='./frontend/static/'),
        ),
    ]
