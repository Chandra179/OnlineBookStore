from django.urls import path, include
from .views import BookList, BookDetail

urlpatterns = [
    path('', BookList.as_view(), name='book-list'),
    path('detail', BookDetail.as_view(), name='book-detail'),
]
