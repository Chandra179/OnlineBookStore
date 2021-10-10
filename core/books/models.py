# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Authors(models.Model):
    first_name = models.CharField(max_length=100, blank=True, null=True)
    second_name = models.CharField(max_length=100, blank=True, null=True)
    company_name = models.CharField(unique=True, max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'authors'
        unique_together = (('first_name', 'second_name'),)


class Books(models.Model):
    isbn = models.CharField(primary_key=True, max_length=-1)
    title = models.CharField(max_length=100)
    publication_date = models.DateField(blank=True, null=True)
    edition = models.IntegerField(blank=True, null=True)
    available_quantity = models.IntegerField()
    price = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True)
    author = models.ForeignKey(Authors, models.DO_NOTHING, db_column='author')
    publisher = models.ForeignKey('Publishers', models.DO_NOTHING, db_column='publisher')

    class Meta:
        managed = False
        db_table = 'books'


class BooksDiscounts(models.Model):
    book = models.ForeignKey(Books, models.DO_NOTHING, blank=True, null=True)
    discount = models.ForeignKey('Discounts', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'books_discounts'


class BooksGenres(models.Model):
    book = models.OneToOneField(Books, models.DO_NOTHING, primary_key=True)
    genre = models.ForeignKey('Genres', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'books_genres'
        unique_together = (('book', 'genre'),)


class Customers(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    login = models.CharField(unique=True, max_length=100)
    passwordhash = models.CharField(max_length=100, blank=True, null=True)
    postal_code = models.CharField(max_length=6)
    street = models.CharField(max_length=100)
    building_no = models.CharField(max_length=5)
    flat_no = models.CharField(max_length=5, blank=True, null=True)
    city = models.CharField(max_length=100)
    nip = models.CharField(max_length=10, blank=True, null=True)
    phone_number = models.CharField(max_length=9, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'customers'


class CustomersDiscounts(models.Model):
    customer = models.ForeignKey(Customers, models.DO_NOTHING)
    discount = models.ForeignKey('Discounts', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'customers_discounts'


class Discounts(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    value = models.DecimalField(max_digits=2, decimal_places=2, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'discounts'


class Genres(models.Model):
    name = models.CharField(unique=True, max_length=100)

    class Meta:
        managed = False
        db_table = 'genres'


class Orders(models.Model):
    customer = models.ForeignKey(Customers, models.DO_NOTHING)
    date = models.DateField(blank=True, null=True)
    discount = models.ForeignKey(Discounts, models.DO_NOTHING, blank=True, null=True)
    shipper = models.ForeignKey('Shippers', models.DO_NOTHING, db_column='shipper')
    state = models.CharField(max_length=-1, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'orders'


class OrdersDetails(models.Model):
    book = models.ForeignKey(Books, models.DO_NOTHING, blank=True, null=True)
    order = models.ForeignKey(Orders, models.DO_NOTHING)
    amount = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'orders_details'


class Publishers(models.Model):
    name = models.CharField(unique=True, max_length=100)

    class Meta:
        managed = False
        db_table = 'publishers'


class Reviews(models.Model):
    book = models.ForeignKey(Books, models.DO_NOTHING)
    customer = models.ForeignKey(Customers, models.DO_NOTHING)
    review = models.IntegerField(blank=True, null=True)
    date = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'reviews'


class Shippers(models.Model):
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=9, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'shippers'
