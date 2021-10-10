
from django.urls import include, path
from rest_framework import routers
  
# router = routers.DefaultRouter()
# router.register(r'books-list', BookView, basename='Book')
# router.register(r'books-detail', BookAuthorView)
  
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls'))
]