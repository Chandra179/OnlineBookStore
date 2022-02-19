from logging import raiseExceptions
from .serializers import AccountSerializer, AddressSerializer
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from .models import UserAddress
from django.http import HttpResponse, JsonResponse

User = get_user_model()


@api_view(['POST'])
def SignInView(request):
    if request.method == 'POST':
        try:
            user_email = User.objects.get(email=request.data['email'])
            password = request.data['password']

            # if token exist get, else create token
            token = Token.objects.get_or_create(user=user_email)
            response = {
                'token': str(token[0]),
                'email': request.data['email']
            }

            if user_email.check_password(password):
                return Response(response, status=status.HTTP_200_OK)
            else:
                return Response('Your password incorrect', status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response('User not found', status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def SignUpView(request):
    if request.method == 'POST':
        user_email = User.objects.filter(email=request.data['email'])
        serializer = AccountSerializer(data=request.data)

        if user_email:
            return Response('User sudah terdaftar!', status=status.HTTP_400_BAD_REQUEST)
        else:
            if serializer.is_valid():
                password = make_password(request.data['password'])
                serializer.save(password=password)

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


class AddressView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        address = UserAddress.objects.all()
        return JsonResponse({"address": list(address)}, content_type='application/json', status=status.HTTP_200_OK)

    def post(self, request, format=None):
        user_id = User.objects.get(email = self.request.data['user'])
        request.data._mutable = True
        request.data['user'] = user_id.id
        request.data._mutable = False

        serializer=AddressSerializer(data = self.request.data)
        serializer.is_valid(raise_exception = True)
        serializer.save()
        return Response('tes', status = status.HTTP_200_OK)