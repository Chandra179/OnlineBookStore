from django.contrib import admin
from .models import Author, Book, BookAuthor, Language, Publisher, BookGenre, Genre


class BookAdmin(admin.ModelAdmin):
    list_display = ('name', 'language', 'num_pages', 'publication_date', 
                    'publisher', 'cover', 'isbn13')
admin.site.register(Book, BookAdmin)


class BookAuthorAdmin(admin.ModelAdmin):
    list_display = ('author', 'book')
admin.site.register(BookAuthor, BookAuthorAdmin)


class BookGenreAdmin(admin.ModelAdmin):
    list_display = ('genre', 'book')
admin.site.register(BookGenre, BookGenreAdmin)


admin.site.register(Author)
admin.site.register(Genre)
admin.site.register(Publisher)
admin.site.register(Language)