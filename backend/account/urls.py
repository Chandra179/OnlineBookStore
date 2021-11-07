from django.urls import path, include
from .views import Login

urlpatterns = [
    path('', Login.as_view(), name='user-login'),
]
