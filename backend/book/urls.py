from django.urls import path, include
from .views import BookDetail, BookList

urlpatterns = [
    path('', BookList, name='book-list'),
    path('detail', BookDetail, name='book-detail'),
]
