from django.urls import path, include
from .views import CartView

urlpatterns = [
    path('', CartView.as_view(), name='add-to-cart'),
]
