from django.contrib import admin
from .models import Author, Book, BookAuthor, BookLanguage, Publisher, Inventory

class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'language', 'num_pages', 'publication_date', 'publisher', 'cover', 'isbn13')
admin.site.register(Book, BookAdmin)

class BookAuthorAdmin(admin.ModelAdmin):
    list_display = ('author', 'book')
admin.site.register(BookAuthor, BookAuthorAdmin)

admin.site.register(Author)
admin.site.register(Publisher)
admin.site.register(BookLanguage)
admin.site.register(Inventory)