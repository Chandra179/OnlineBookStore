from django.urls import path, include
from .views import BookDetail, BooksByGenre, GenreList, TopTenBooks

urlpatterns = [
    path('', BooksByGenre, name='books-per-category'),
    path('genre-list', GenreList, name='genre-list'),
    path('detail', BookDetail, name='book-detail'),
    path('top-ten-books', TopTenBooks, name='top-ten-books'),
]
