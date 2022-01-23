from django.urls import path, include
from .views import BookDetail, BookList, BookPerCategory

urlpatterns = [
    path('', BookList, name='book-list'),
    path('detail', BookDetail, name='book-detail'),
    path('cat', BookPerCategory, name='book-per-category'),
]
