from django.urls import path, include
from .views import BookDetail, BookList, BooksPerGenre, GenreList

urlpatterns = [
    path('', BookList, name='book-list'),
    path('genre-list', GenreList, name='genre-list'),
    path('detail', BookDetail, name='book-detail'),
    path('books-per-genre', BooksPerGenre, name='books-per-category'),
]
