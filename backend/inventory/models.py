from django.db import models
from django.db import models
from book.models import Book

# Create your models here.
class Inventory(models.Model):
    stock = models.IntegerField(default=0)
    book = models.OneToOneField(Book, default='', on_delete=models.CASCADE)

    def __str__(self):
        return self.book.name
