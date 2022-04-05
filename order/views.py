from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
import stripe

# This is your test secret API key.
stripe.api_key = 'sk_test_51J0LjtBMpJ02BJLO90NrgLiGoiK7DQvSGFM5oalEZGlqxhre6MTJOSDSJrC1H7LVzM9OUAetDvUI774VR4hxr8Oc00HWSCq48m'

class OrderPayment(APIView):
    """
        :request (header): authorization: Token
        if token is supplied, then we can get user information like token or email
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        """
            :rtype: str
        """
        totalPrice = 0
        for x in self.request.data:
            totalPrice += float(self.request.data[x]['price'])
            
        intent = stripe.PaymentIntent.create(
            amount=round(totalPrice * 100),
            currency='eur',
            automatic_payment_methods={
                'enabled': True,
            },
        )
        return Response({'clientSecret': intent['client_secret']}, status=status.HTTP_200_OK, content_type="application/json")