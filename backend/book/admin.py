from django.contrib import admin
from .models import Author, Book, BookAuthor, Language, Publisher, Genre


class BookAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'publication_date', 'publisher')
admin.site.register(Book, BookAdmin)


class BookAuthorAdmin(admin.ModelAdmin):
    list_display = ('author', 'book')
admin.site.register(BookAuthor, BookAuthorAdmin)


admin.site.register(Author)
admin.site.register(Genre)
admin.site.register(Publisher)
admin.site.register(Language)