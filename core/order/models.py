from django.db import models
from books.models import Book
from customer.models import Address

# Create your models here.
class CustOrder(models.Model):
    order_id = models.AutoField(primary_key=True)
    order_date = models.DateTimeField(blank=True, null=True)
    customer = models.ForeignKey('Customer', models.DO_NOTHING, blank=True, null=True)
    shipping_method = models.ForeignKey('ShippingMethod', models.DO_NOTHING, blank=True, null=True)
    dest_address = models.ForeignKey(Address, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'cust_order'


class OrderHistory(models.Model):
    history_id = models.AutoField(primary_key=True)
    order = models.ForeignKey(CustOrder, models.DO_NOTHING, blank=True, null=True)
    status = models.ForeignKey('OrderStatus', models.DO_NOTHING, blank=True, null=True)
    status_date = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'order_history'


class OrderLine(models.Model):
    line_id = models.AutoField(primary_key=True)
    order = models.ForeignKey(CustOrder, models.DO_NOTHING, blank=True, null=True)
    book = models.ForeignKey(Book, models.DO_NOTHING, blank=True, null=True)
    price = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'order_line'


class OrderStatus(models.Model):
    status_id = models.IntegerField(primary_key=True)
    status_value = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'order_status'


class ShippingMethod(models.Model):
    method_id = models.IntegerField(primary_key=True)
    method_name = models.CharField(max_length=100, blank=True, null=True)
    cost = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'shipping_method'