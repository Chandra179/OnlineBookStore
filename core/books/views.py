from rest_framework import viewsets
from .serializers import BookAuthorSerializer
from .models import Book, BookAuthor


class BookAuthorView(viewsets.ModelViewSet):
    queryset = BookAuthor.objects.all()
    serializer_class = BookAuthorSerializer