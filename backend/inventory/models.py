from django.db import models
from django.db import models
from book.models import Book

# Create your models here.
class Inventory(models.Model):
    stock = models.IntegerField(blank=True, null=True)
    book = models.OneToOneField(Book, blank=True, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.book.name
