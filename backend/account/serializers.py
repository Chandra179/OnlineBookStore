from django.forms import ValidationError
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import UserAddress
from django.core.exceptions import ValidationError

User = get_user_model()


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password']


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAddress
        fields = "__all__"

    def create(self, validated_data):
        if UserAddress.objects.filter(user=validated_data['user']).count() < 5:
            return UserAddress.objects.create(**validated_data)
        raise ValidationError("Too many records")
