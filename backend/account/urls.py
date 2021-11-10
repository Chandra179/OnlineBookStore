from django.urls import path, include
from .views import SignIn

urlpatterns = [
    path('', SignIn.as_view(), name='user-login'),
]
