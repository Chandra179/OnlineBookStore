from django.db import models
from django.db import models
from book.models import Book

# Create your models here.
class Inventory(models.Model):
    book = models.ForeignKey(Book, blank=True, null=True, on_delete=models.CASCADE)
    stock = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.book.name
