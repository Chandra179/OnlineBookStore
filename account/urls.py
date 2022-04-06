from django.urls import path
from .views import SignInView, SignUpView

urlpatterns = [
    path('signin', SignInView, name='user-signin'),
    path('signup', SignUpView, name='user-signup'),
    #path('address', AddressView.as_view(), name='user-address'),
]
