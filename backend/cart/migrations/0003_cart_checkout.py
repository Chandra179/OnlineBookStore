# Generated by Django 3.2.8 on 2022-02-13 12:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cart', '0002_alter_cart_unique_together'),
    ]

    operations = [
        migrations.AddField(
            model_name='cart',
            name='checkout',
            field=models.BooleanField(default=False),
        ),
    ]
