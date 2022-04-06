from .serializers import AccountSerializer
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view

"""
    SignInView: signin
    SignUpView: signup
"""

User = get_user_model()

@api_view(['POST'])
def SignInView(request):
    """
        :request (body): email<str> password<str>
        :rtype: json
    """
    if request.method == 'POST':
        try:
            user_email = User.objects.get(email=request.data['email'])
            password = request.data['password']

            # if token is exist, get token else create token
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
    """
        :request (body): email<str> password<str>
        :rtype: json
    """
    if request.method == 'POST':
        user_email = User.objects.filter(email=request.data['email'])
        serializer = AccountSerializer(data=request.data)

        # if user in model
        if user_email:
            return Response('User is already registered!', status=status.HTTP_400_BAD_REQUEST)
        
        if serializer.is_valid():
            # hash the password
            password = make_password(request.data['password'])
            serializer.save(password=password)

            user_email = User.objects.get(email=request.data['email'])

            # get user token if exist, else create token
            token = Token.objects.get_or_create(user=user_email)
            response = {
                'token': str(token[0]),
                'email': request.data['email']
            }
            return Response(response, status=status.HTTP_200_OK)
        else:
            return Response('Validation error', status=status.HTTP_400_BAD_REQUEST)


# class AddressView(APIView):
#     """
#         :request (header): authorization: Token
#         if token is supplied, then we can get user information like token or email
#     """
#     permission_classes = [IsAuthenticated]

#     def get(self, request, format=None):
#         """
#             :rtype: str
#         """
#         address = UserAddress.objects.filter(user=request.user.email)
#         if len(address):
#             serializer = AddressSerializer(address, many=True)
#             return Response(serializer.data, content_type='application/json', status=status.HTTP_200_OK)
#         # if address empty
#         else:
#             return Response('empty', content_type='application/json', status=status.HTTP_404_NOT_FOUND)

#     def post(self, request, format=None):
#         """
#             :rtype: str
#         """
#         serializer = AddressSerializer(data=self.request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response('address has been saved', status=status.HTTP_200_OK)