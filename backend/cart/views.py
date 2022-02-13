from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Cart
from book.models import Book
from account.models import User
from .serializers import CartSerializer
from django.core import serializers
from django.http import JsonResponse, HttpResponse


class CartView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    """
        return cart item
    """

    def get(self, request, format=None):
        cart = Cart.objects.filter(user=request.user)
        print(cart)
        return HttpResponse(serializers.serialize('json', cart), content_type="application/json")

    """
        add product to cart
    """

    def post(self, request, format=None):
        name = request.data.get("name")
        qty = request.data.get("qty")

        book = Book.objects.get(name__iexact=name).id
        user = User.objects.get(email__iexact=str(request.user)).id
      
        data = {
            'book':book,
            'user':user,
            'qty':qty
        }
        serializer = CartSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response("Item successfuly added", status=status.HTTP_200_OK, content_type="application/json")
