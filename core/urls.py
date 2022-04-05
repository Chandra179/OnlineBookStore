from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework.authtoken import views
from .views import index

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-token-auth/', views.obtain_auth_token),
    path('account/', include('account.urls')),
    path('book/', include('book.urls')),
    path('order', include('order.urls')),
    
    # REACT ROUTER-DJANGO
    re_path(r'^(%s)?$' % '|', index, name='index'),
    path('genres/<str:genre>/<int:page>', index),
    path('genres/<str:genre>/<int:page>/<str:title>', index),
    path('cart', index),
    path('signin', index),
    path('signup', index),
]
