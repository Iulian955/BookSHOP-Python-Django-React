# Generated by Django 3.1.4 on 2020-12-22 08:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0017_opinion_date_added'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='on_discount',
            field=models.BooleanField(default=False),
        ),
    ]
