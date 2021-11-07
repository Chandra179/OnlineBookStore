from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from .models import Book

class Login(APIView):
    
    def get(self, request, format=None):
        """
        Return a list of all users.
        """
        book_title = [book.title for book in Book.objects.all()]
        return Response(book_title)