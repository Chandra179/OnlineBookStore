from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import authentication, permissions
from rest_framework import status
from .serializers import BookSerializer
from .models import Book, BookAuthor
from django.http import JsonResponse, HttpResponse
from django.core import serializers
from django.shortcuts import get_object_or_404
from django.core import serializers
"""
BOOK API
"""
class BookList(APIView):

    def get(self, request):
        total_book = Book.objects.all().count()
        queryset = Book.objects.prefetch_related('book_author')
        book_list = []
        for x in queryset:
            book_author = [book.author_name for book in x.book_author.all()]
            book_list.append({
                'title': x.title, 
                'author': book_author,
                'cover':x.cover,
                'desc': x.description,
                'language':x.language.language_name,
                'num_pages': x.num_pages,
                'publication_date': x.publication_date,
                'publisher': x.publisher.publisher_name
            })
            headers = {
                'total_book': total_book
            }
        return Response(data=book_list, status=status.HTTP_200_OK, headers=headers)