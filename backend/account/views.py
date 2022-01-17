from .serializers import AccountSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token

User = get_user_model()


class SignIn(APIView):

    def post(self, request, format=None):
        try:
            user_email = User.objects.get(email=request.data['email'])
            password = request.data['password']
            token = Token.objects.get_or_create(user=user_email)
            if user_email.check_password(password):
                return Response({'token': str(token[0])}, status=status.HTTP_200_OK)
            else:
                return Response('Your password incorrect', status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response('User not found', status=status.HTTP_400_BAD_REQUEST)


class SignUp(APIView):

    def post(self, request, format=None):
        user_email = User.objects.filter(email=request.data['email'])
        serializer = AccountSerializer(data=request.data)

        if user_email:
            return Response('User sudah terdaftar!', status=status.HTTP_400_BAD_REQUEST)
        else:
            if serializer.is_valid():
                password = make_password(self.request.data['password'])
                serializer.save(password = password)
                
                # get created user, and set the token
                user_email = User.objects.get(email=request.data['email'])
                token = Token.objects.get_or_create(user=user_email)
                response = {
                    'token': str(token[0]),
                    'email': request.data['email']
                }

                return Response(response, status=status.HTTP_200_OK)
            else:
                return Response('validasi error', status=status.HTTP_400_BAD_REQUEST)
        
        