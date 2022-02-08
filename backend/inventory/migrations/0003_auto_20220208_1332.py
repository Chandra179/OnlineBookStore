# Generated by Django 3.2.8 on 2022-02-08 13:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('book', '0004_auto_20220208_1324'),
        ('inventory', '0002_alter_inventory_book'),
    ]

    operations = [
        migrations.AlterField(
            model_name='inventory',
            name='book',
            field=models.OneToOneField(default='', on_delete=django.db.models.deletion.CASCADE, to='book.book'),
        ),
        migrations.AlterField(
            model_name='inventory',
            name='stock',
            field=models.IntegerField(default=0),
        ),
    ]
