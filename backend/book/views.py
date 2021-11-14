from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import authentication, permissions
from rest_framework import status
from .serializers import BookSerializer, BookAuthorSerializer
from .models import Book, BookAuthor
from django.http import JsonResponse


class BookList(APIView):
    serializer_class = BookAuthorSerializer

    def get(self, request):
        queryset = Book.objects.all()
        book_list = []
        for x in queryset:
            books = [book.author_name for book in x.book_author.all()]
            book_list.append({'title': x.title, 'book_author': books})
        return Response(book_list)