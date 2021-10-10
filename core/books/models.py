# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Author(models.Model):
    author_id = models.IntegerField(primary_key=True)
    author_name = models.CharField(max_length=400, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'author'
    
    def __str__(self):
        return self.author_name 


class Publisher(models.Model):
    publisher_id = models.IntegerField(primary_key=True)
    publisher_name = models.CharField(max_length=400, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'publisher'


class BookLanguage(models.Model):
    language_id = models.IntegerField(primary_key=True)
    language_code = models.CharField(max_length=8, blank=True, null=True)
    language_name = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'book_language'


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

    def get_related_obj(self):
        book = Book.objects.select_related().filter(book_id = self.book)
        author = Author.objects.select_related().filter(author_id = self.author)
        return 



