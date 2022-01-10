from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework import status
from .models import Book
from .serializers import BookSerializer

"""
BOOK API
"""

class BookList(APIView):
    
    def get(self, request, format=None):
        total_book = Book.objects.all().count()
        books = Book.objects.prefetch_related('book_author')
        book_list = []
        for x in books:
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
        paginator = PageNumberPagination()
        result_page = paginator.paginate_queryset(book_list, request)
        return Response(result_page, status=status.HTTP_200_OK, headers=headers)