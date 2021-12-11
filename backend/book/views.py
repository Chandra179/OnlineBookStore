from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import authentication, permissions
from rest_framework import status
from .serializers import BookSerializer, BookAuthorSerializer
from .models import Book, BookAuthor
from django.http import JsonResponse
from django.core import serializers

"""
BOOK API
"""
class BookList(APIView):

    def get(self, request):
        queryset = Book.objects.prefetch_related('book_author')
        book_list = []
        for x in queryset:
            book_author = [book.author_name for book in x.book_author.all()]
            book_list.append({
                'title': x.title, 
                'author': book_author,
                'cover':x.cover
            })
        return Response(book_list, status=status.HTTP_200_OK)


class BookDetail(APIView):

    def get(self, request):
        title = request.data['title']
        book = Book.objects.get(title=title)
        book_author = book.book_author.values_list('author_name', flat=True)[0]
        book_detail = {
            'title': book.title,
            'author':book_author,
            'cover': book.cover,
            'desc': book.description,
            'language':book.language.language_name,
            'num_pages': book.num_pages,
            'publication_date': book.publication_date,
            'publisher': book.publisher.publisher_name
        }
        #book_title = Book.objects.filter(title=title)
        #book_title = get_object_or_404(Book, title=title)
        return Response(book_detail, status=status.HTTP_200_OK)