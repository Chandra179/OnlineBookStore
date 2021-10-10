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


class Country(models.Model):
    country_id = models.IntegerField(primary_key=True)
    country_name = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'country'


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



