from rest_framework import serializers
from .models import BookAuthor
  

class BookAuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookAuthor
        fields = '__all__'