from django.urls import path, include
from .views import SignInView, SignUpView, AddressView

urlpatterns = [
    path('signin', SignInView, name='user-signin'),
    path('signup', SignUpView, name='user-signup'),
    path('address', AddressView.as_view(), name='user-address'),
]
