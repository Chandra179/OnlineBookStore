from django.urls import path, include
from .views import BookList

urlpatterns = [
    path('', BookList.as_view(), name='book-list'),
]
