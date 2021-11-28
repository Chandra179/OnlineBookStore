from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import authentication, permissions
from rest_framework import status
from .serializers import BookSerializer, BookAuthorSerializer
from .models import Book, BookAuthor
from django.http import JsonResponse

"""
BOOK API
"""
class BookList(APIView):
    serializer_class = BookAuthorSerializer

    def get(self, request):
        queryset = Book.objects.prefetch_related('book_author')
        book_list = []
        for x in queryset:
            books = [book.author_name for book in x.book_author.all()]
            book_list.append({'title': x.title, 'book_author': books, 'cover':x.cover})
        return Response(book_list, status=status.HTTP_200_OK)