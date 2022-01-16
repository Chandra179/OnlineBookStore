from django.http import response
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework import status
from .models import Book
from .serializers import BookSerializer

"""
BOOK API
"""
@api_view(['GET'])
def BookList(request):

    if request.method == 'GET':
        total_book = Book.objects.all().count()
        books = Book.objects.prefetch_related('book_author')
        book_list = []
        for x in books:
            book_author = [book.author_name for book in x.book_author.all()]
            book_list.append({
                'title': x.title, 
                'author': book_author,
                'cover':x.cover,
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
        title = request.query_params.get('title')
        book = Book.objects.get(title__iexact=title)
        book_author = book.book_author.values_list('author_name', flat=True)[0]
        response = {
            'title': book.title,
            'author':book_author,
            'cover': book.cover,
            'desc': book.description,
            'language':book.language.language_name,
            'num_pages': book.num_pages,
            'publication_date': book.publication_date,
            'publisher': book.publisher.publisher_name
        }
        return Response(response, status=status.HTTP_200_OK)