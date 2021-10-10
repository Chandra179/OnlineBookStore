
from django.urls import include, path
from rest_framework import routers
from .views import BookView
  
router = routers.DefaultRouter()
router.register(r'books-list', BookView, basename='Book')
  
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls'))
]