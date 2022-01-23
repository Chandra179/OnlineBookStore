from django.db import models


class Author(models.Model):
    name = models.CharField(max_length=400, blank=True, null=True)

    def __str__(self):
        return self.name


class Language(models.Model):
    code = models.CharField(max_length=8, blank=True, null=True)
    name = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.name


class Publisher(models.Model):
    name = models.CharField(max_length=400, blank=True, null=True)

    def __str__(self):
        return self.name


class Genre(models.Model):
    name = models.CharField(max_length=400, blank=True, null=True)

    def __str__(self):
        return self.name


class Book(models.Model):
    name = models.CharField(max_length=400, blank=True, null=True)
    cover = models.CharField(max_length=400, blank=True, null=True)
    isbn13 = models.CharField(max_length=13, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    num_pages = models.IntegerField(blank=True, null=True)
    publication_date = models.DateField(blank=True, null=True)
    language = models.ForeignKey('Language', blank=True, null=True, on_delete=models.CASCADE)
    publisher = models.ForeignKey('Publisher', blank=True, null=True, on_delete=models.CASCADE)
    book_genre = models.ManyToManyField('Genre', through='BookGenre')
    book_author = models.ManyToManyField('Author', through='BookAuthor')

    def __str__(self):
        return self.name


class BookGenre(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('book', 'genre',)


class BookAuthor(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('book', 'author',)


# class Customer(models.Model):
#     customer_id = models.IntegerField(primary_key=True)
#     first_name = models.CharField(max_length=200, blank=True, null=True)
#     last_name = models.CharField(max_length=200, blank=True, null=True)
#     email = models.CharField(max_length=350, blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'customer'

# class Address(models.Model):
#     address_id = models.IntegerField(primary_key=True)
#     street_number = models.CharField(max_length=10, blank=True, null=True)
#     street_name = models.CharField(max_length=200, blank=True, null=True)
#     city = models.CharField(max_length=100, blank=True, null=True)
#     country = models.ForeignKey('Country', models.DO_NOTHING, blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'address'


# class AddressStatus(models.Model):
#     status_id = models.IntegerField(primary_key=True)
#     address_status = models.CharField(max_length=30, blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'address_status'


# class CustomerAddress(models.Model):
#     customer = models.OneToOneField(Customer, models.DO_NOTHING, primary_key=True)
#     address = models.ForeignKey(Address, models.DO_NOTHING)
#     status_id = models.IntegerField(blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'customer_address'
#         unique_together = (('customer', 'address'),)
 



# class Country(models.Model):
#     country_id = models.IntegerField(primary_key=True)
#     country_name = models.CharField(max_length=200, blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'country'


# class CustOrder(models.Model):
#     order_id = models.AutoField(primary_key=True)
#     order_date = models.DateTimeField(blank=True, null=True)
#     customer = models.ForeignKey('Customer', models.DO_NOTHING, blank=True, null=True)
#     shipping_method = models.ForeignKey('ShippingMethod', models.DO_NOTHING, blank=True, null=True)
#     dest_address = models.ForeignKey(Address, models.DO_NOTHING, blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'cust_order'


# class OrderHistory(models.Model):
#     history_id = models.AutoField(primary_key=True)
#     order = models.ForeignKey(CustOrder, models.DO_NOTHING, blank=True, null=True)
#     status = models.ForeignKey('OrderStatus', models.DO_NOTHING, blank=True, null=True)
#     status_date = models.DateTimeField(blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'order_history'


# class OrderLine(models.Model):
#     line_id = models.AutoField(primary_key=True)
#     order = models.ForeignKey(CustOrder, models.DO_NOTHING, blank=True, null=True)
#     book = models.ForeignKey(Book, models.DO_NOTHING, blank=True, null=True)
#     price = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'order_line'


# class OrderStatus(models.Model):
#     status_id = models.IntegerField(primary_key=True)
#     status_value = models.CharField(max_length=20, blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'order_status'




# class ShippingMethod(models.Model):
#     method_id = models.IntegerField(primary_key=True)
#     method_name = models.CharField(max_length=100, blank=True, null=True)
#     cost = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'shipping_method'
