# Generated by Django 3.2.8 on 2022-02-13 15:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cart', '0003_cart_checkout'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cart',
            name='checkout',
        ),
    ]