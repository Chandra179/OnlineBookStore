from rest_framework import viewsets, generics
from .serializers import BookSerializer
from .models import Book


class BookView(viewsets.ModelViewSet):
    serializer_class = BookSerializer

    def get_queryset(self):
        queryset = Book.objects.all()
        title = self.request.query_params.get('title')
        if title is not None:
            queryset = queryset.filter(book__title=title, )
        return queryset
    