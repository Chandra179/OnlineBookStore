from django.urls import path, include
from .views import SignIn, SignUp

urlpatterns = [
    path('signin', SignIn.as_view(), name='user-signin'),
    path('signup', SignUp.as_view(), name='user-signup'),
]
