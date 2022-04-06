<<<<<<< HEAD
from django.urls import path
from .views import SignInView, SignUpView
=======
from django.urls import path, include
from .views import SignInView, SignUpView, AddressView
>>>>>>> main

urlpatterns = [
    path('signin', SignInView, name='user-signin'),
    path('signup', SignUpView, name='user-signup'),
<<<<<<< HEAD
    #path('address', AddressView.as_view(), name='user-address'),
=======
    path('address', AddressView.as_view(), name='user-address'),
>>>>>>> main
]
