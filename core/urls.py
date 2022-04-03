import imp
from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken import views
from .views import index

urlpatterns = [
    path('', index, name='index'),
    path('admin/', admin.site.urls),
    path('api-token-auth/', views.obtain_auth_token),
    path('account/', include('account.urls')),
    path('book/', include('book.urls')),
    path('order', include('order.urls'))
]
