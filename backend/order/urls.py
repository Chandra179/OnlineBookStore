from django.urls import path, include
from .views import OrderPayment

urlpatterns = [
    path('', OrderPayment.as_view(), name='order-payment'),
]
