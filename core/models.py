# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Address(models.Model):
    address_id = models.IntegerField(primary_key=True)
    street_number = models.CharField(max_length=10, blank=True, null=True)
    street_name = models.CharField(max_length=200, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    country = models.ForeignKey('Country', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'address'


class AddressStatus(models.Model):
    status_id = models.IntegerField(primary_key=True)
    address_status = models.CharField(max_length=30, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'address_status'


class Author(models.Model):
    author_id = models.IntegerField(primary_key=True)
    author_name = models.CharField(max_length=400, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'author'


class Book(models.Model):
    book_id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=400, blank=True, null=True)
    isbn13 = models.CharField(max_length=13, blank=True, null=True)
    language = models.ForeignKey('BookLanguage', models.DO_NOTHING, blank=True, null=True)
    num_pages = models.IntegerField(blank=True, null=True)
    publication_date = models.DateField(blank=True, null=True)
    publisher = models.ForeignKey('Publisher', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'book'


class BookAuthor(models.Model):
    book = models.OneToOneField(Book, models.DO_NOTHING, primary_key=True)
    author = models.ForeignKey(Author, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'book_author'
        unique_together = (('book', 'author'),)


class BookLanguage(models.Model):
    language_id = models.IntegerField(primary_key=True)
    language_code = models.CharField(max_length=8, blank=True, null=True)
    language_name = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'book_language'


class Country(models.Model):
    country_id = models.IntegerField(primary_key=True)
    country_name = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'country'


class CustOrder(models.Model):
    order_id = models.AutoField(primary_key=True)
    order_date = models.DateTimeField(blank=True, null=True)
    customer = models.ForeignKey('Customer', models.DO_NOTHING, blank=True, null=True)
    shipping_method = models.ForeignKey('ShippingMethod', models.DO_NOTHING, blank=True, null=True)
    dest_address = models.ForeignKey(Address, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'cust_order'


class Customer(models.Model):
    customer_id = models.IntegerField(primary_key=True)
    first_name = models.CharField(max_length=200, blank=True, null=True)
    last_name = models.CharField(max_length=200, blank=True, null=True)
    email = models.CharField(max_length=350, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'customer'


class CustomerAddress(models.Model):
    customer = models.OneToOneField(Customer, models.DO_NOTHING, primary_key=True)
    address = models.ForeignKey(Address, models.DO_NOTHING)
    status_id = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'customer_address'
        unique_together = (('customer', 'address'),)


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


class Publisher(models.Model):
    publisher_id = models.IntegerField(primary_key=True)
    publisher_name = models.CharField(max_length=400, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'publisher'


class ShippingMethod(models.Model):
    method_id = models.IntegerField(primary_key=True)
    method_name = models.CharField(max_length=100, blank=True, null=True)
    cost = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'shipping_method'
