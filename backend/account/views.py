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
        user_email = get_object_or_404(User, email=request.data['email'])
        password = request.data['password']

        if user_email.check_password(password):
            return Response('user sudah terdaftar', status=status.HTTP_201_CREATED)
        return Response('user belum terdaftar', status=status.HTTP_404_NOT_FOUND)


class SigUp(APIView):
    
    def post(self, request, format=None):
        serializer = AccountSerializer(data=request.data)
        
        if serializer.is_valid():
            email_seri = serializer.validated_data.get('email')
            user_email = get_object_or_404(email=email_seri)
            
            
            print('--------------------------------------------------------------')
            print(user_email)

            password = make_password(self.request.data['password'])
            serializer.save(password = password)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)