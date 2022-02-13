from django.db import models
from account.models import User
from book.models import Book


class Cart(models.Model):
    book = models.ForeignKey(Book, default='', on_delete=models.CASCADE)
    user = models.ForeignKey(User, default='', on_delete=models.CASCADE)
    qty = models.IntegerField(default=0)
    
    class Meta:
        unique_together = ["book", "user"]

    def __str__(self):
        return self.user.email

