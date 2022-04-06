from django.urls import path, include
from .views import BookDetailView, BooksByGenreView, GenreListView, TopTenBooksView

urlpatterns = [
    path('', BooksByGenreView, name='books-per-category'),
    path('genre-list', GenreListView, name='genre-list'),
    path('detail', BookDetailView, name='book-detail'),
    path('top-ten-books', TopTenBooksView, name='top-ten-books'),
]
