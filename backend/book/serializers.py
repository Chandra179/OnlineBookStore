from rest_framework import serializers
from .models import Book, BookAuthor


class BookAuthorSerializer(serializers.ModelSerializer):
    author_name = serializers.ReadOnlyField(source='author.name')

    class Meta:
        model = BookAuthor
        fields = ('author_name', )


class BookSerializer(serializers.ModelSerializer):
    language = serializers.CharField(source='language.name')
    publisher = serializers.CharField(source='publisher.name')
    genre = serializers.CharField(source='genre.name')
    
    """
        to get Author which is m2m relation through book_author model, 
        we need serializer for book_author to get author name
    """
    book_author = BookAuthorSerializer(source='bookauthor_set', many=True)
    stock = serializers.IntegerField(source='inventory.stock')

    class Meta:
        model = Book
        fields = "__all__"

