from rest_framework import serializers
from .models import Cart


class CartSerializer(serializers.ModelSerializer):
    book_name = serializers.ReadOnlyField(source='book.name')
    qty = serializers.IntegerField()

    class Meta:
        model = Cart
        fields = ('book_name' , 'qty')
