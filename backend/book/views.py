from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework import status
from .models import Book, Genre
from inventory.models import Inventory
from django.db.models import Prefetch


@api_view(['GET'])
def BooksPerGenre(request):

    if request.method == 'GET':
        response = []
        books = []

        # retrieve latest 10 books for each genre
        for genre in Genre.objects.all().distinct():
            books.extend(Book.objects 
                    .filter(genre=genre.id) 
                    .prefetch_related('book_author')[:1]
            )

        for book in books:
            book_author = [x.name for x in book.book_author.all()]
            response.append({
                'name': book.name,
                'author': book_author,
                'genre': book.genre.name,
                'cover': book.cover,
            })

        return Response(response, content_type='application/json', status=status.HTTP_200_OK)


@api_view(['GET'])
def BookList(request):

    if request.method == 'GET':
        total_book = Book.objects.all().count()
        books = Book.objects.prefetch_related('book_author')
        book_list = []
        for x in books:
            book_author = [book.name for book in x.book_author.all()]
            book_list.append({
                'name': x.name,
                'author': book_author,
                'cover': x.cover,
            })
        headers = {
            'total_book': total_book
        }
        paginator = PageNumberPagination()
        result_page = paginator.paginate_queryset(book_list, request)
        return Response(result_page, status=status.HTTP_200_OK, headers=headers)


@api_view(['GET'])
def BookDetail(request):

    if request.method == 'GET':
        name = request.query_params.get('name')
        book = Book.objects.get(name__iexact=name)
        inventory = Inventory.objects.get(book__name__iexact=name)
        book_author = book.book_author.values_list('name', flat=True)[0]
        response = {
            'name': book.name,
            'author': book_author,
            'cover': book.cover,
            'desc': book.description,
            'language': book.language.name,
            'num_pages': book.num_pages,
            'publication_date': book.publication_date,
            'stock': inventory.stock,
            'publisher': book.publisher.name
        }
        return Response(response, status=status.HTTP_200_OK)
