from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework import status
from .models import Book, Genre
from .serializers import BookSerializer
from inventory.models import Inventory
import collections
import json
from django.http import HttpResponse, JsonResponse
from django.core import serializers


@api_view(['GET'])
def BooksByGenre(request):
    """
        Returns book by genre by pagination
    """
    if request.method == 'GET':
        genre = request.query_params.get('genre')
        books = Book.objects \
            .filter(genre__name__iexact=genre) \
            .select_related('language', 'genre', 'publisher') \
            .prefetch_related('book_author')
            
        serializer = BookSerializer(books, many=True)
        data = serializer.data

        headers = {
            'total_book': books.count()
        }
        paginator = PageNumberPagination()
        result_page = paginator.paginate_queryset(data, request)
        
        return Response(result_page, status=status.HTTP_200_OK, content_type="application/json", headers=headers)


@api_view(['GET'])
def BookDetail(request):
    """
        Return book detail response
    """
    if request.method == 'GET':
        name = request.query_params.get('name')
        book = Book.objects.get(name__iexact=name)
        serializer = BookSerializer(book)
        data = serializer.data
        
        return Response(data, status=status.HTTP_200_OK, content_type="application/json")


@api_view(['GET'])
def GenreList(request):
    """
        Returns all Genre
    """
    if request.method == 'GET':
        genre = Genre.objects.all().values("name")
        return JsonResponse({"genre": list(genre)}, content_type='application/json', status=status.HTTP_200_OK)


@api_view(['GET'])
def TopTenBooks(request):
    """
        Returns 10 books for selected category
    """
    if request.method == 'GET':
        response = collections.defaultdict(list)
        books = []

        # retrieve latest 10 books for each genre ID
        for genre in Genre.objects.all().distinct():
            books.extend(Book.objects
                         .filter(genre=genre.id)
                         .prefetch_related('book_author')[:10]
                         )

        for book in books:
            book_author = [x.name for x in book.book_author.all()]
            result = {
                'name': book.name,
                'author': book_author,
                'cover': book.cover,
            }
            response[book.genre.name].append(result)
        return Response(response, content_type='application/json', status=status.HTTP_200_OK)
