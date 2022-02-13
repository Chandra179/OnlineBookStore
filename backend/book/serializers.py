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
    book_author = BookAuthorSerializer(source='book_author.author', many=True, read_only=True)

    class Meta:
        model = Book
        fields = "__all__"
        depth = 1


