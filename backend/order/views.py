from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework import status
from .models import Book, Genre
from .serializers import BookSerializer
import collections
from django.http import JsonResponse
import json
import stripe

# This is your test secret API key.
stripe.api_key = 'sk_test_51J0LjtBMpJ02BJLO90NrgLiGoiK7DQvSGFM5oalEZGlqxhre6MTJOSDSJrC1H7LVzM9OUAetDvUI774VR4hxr8Oc00HWSCq48m'

@api_view(['POST'])
def CreatePayment(request):
    try:
        data = request.data
        # Create a PaymentIntent with the order amount and currency
        intent = stripe.PaymentIntent.create(
            amount=data["amount"],
            currency='eur',
            automatic_payment_methods={
                'enabled': True,
            },
        )
        return Response({'clientSecret': intent['client_secret']}, status=status.HTTP_200_OK, content_type="application/json")

    except Exception as e:
        return Response(error=str(e)), 403