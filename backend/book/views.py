from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework import status
from .models import Book, Genre
from .serializers import BookSerializer
import collections
from django.http import JsonResponse

"""
    API list
    --------
    BooksByGenre: return all books, specified by genre
    BookDetail: return book detail, specified by book name
    GenreList: return all genre
    TopTenBooks: return 10 books, specified by category
"""

@api_view(['GET'])
def BooksByGenre(request):
    """
        :parameter: ?genre=<str>&page=<int>
        :rtype: json
    """
    if request.method == 'GET':
        genre = request.query_params.get('genre')
        """
            Get all books filtered by genre, exclude books with empty stock
        """
        books = Book.objects \
            .filter(genre__name__iexact=genre) \
            .exclude(inventory__stock=0) \
            .select_related('language', 'genre', 'publisher') \
            .prefetch_related('book_author')
            
        serializer = BookSerializer(books, many=True)
        data = serializer.data

        headers = {
            'total_book': books.count()
        }
        """
            paginate response data, data limit per page is set in
            settings REST_FRAMEWORK => PAGE_SIZE
        """
        paginator = PageNumberPagination()
        result_page = paginator.paginate_queryset(data, request)
        
        return Response(result_page, status=status.HTTP_200_OK, content_type="application/json", headers=headers)


@api_view(['GET'])
def BookDetail(request):
    """
        :parameter: ?name=<str>
        :rtype: json
    """
    if request.method == 'GET':
        name = request.query_params.get('name')
        book = Book.objects.get(name__iexact=name)
        serializer = BookSerializer(book)
        
        return Response(serializer.data, status=status.HTTP_200_OK, content_type="application/json")


@api_view(['GET'])
def GenreList(request):
    """
        :rtype: json
    """
    if request.method == 'GET':
        genre = Genre.objects.all().values("name")
        return JsonResponse({"genre": list(genre)}, content_type='application/json', status=status.HTTP_200_OK)


@api_view(['GET'])
def TopTenBooks(request):
    """
        return top 10 books with specified category, 
        eg: top 10 best seller books, 
            top 10 best seller books by genre, etc.
        --------------------------------------------
        :parameter: ?genre=<str>&page=<int>
        :rtype: json
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
