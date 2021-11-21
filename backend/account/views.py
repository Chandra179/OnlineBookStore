from .serializers import AccountSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.shortcuts import get_object_or_404

User = get_user_model()

class SignIn(APIView):

    def post(self, request, format=None):
        try:
            user_email = User.objects.get(email=request.data['email'])
            password = request.data['password']
            if user_email.check_password(password):
                return Response('Login Succeed', status=status.HTTP_200_OK)
            return Response('Your password incorrect', status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response('User not found', status=status.HTTP_400_BAD_REQUEST)


class SignUp(APIView):
    
    def post(self, request, format=None):
        user_email = User.objects.filter(email=request.data['email'])
        serializer = AccountSerializer(data=request.data)
        
        if user_email:
            return Response('user sudah terdaftar', status=status.HTTP_400_BAD_REQUEST)
        else:
            if serializer.is_valid():
                password = make_password(self.request.data['password'])
                serializer.save(password = password)
                return Response('user terdaftar', status=status.HTTP_200_OK)
            return Response('validasi error', status=status.HTTP_400_BAD_REQUEST)