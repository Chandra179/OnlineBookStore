# from rest_framework import serializers
# from .models import Book

# from .models import Book

# class BookSerializer(serializers.Serializer):
    
#     class Meta:
#         model = Book
#         fields = ['username', 'email', 'profile']

#     email = serializers.EmailField()
#     content = serializers.CharField(max_length=200)
#     created = serializers.DateTimeField()

#     def create(self, validated_data):
#         return Book(**validated_data)

#     def update(self, instance, validated_data):
#         instance.email = validated_data.get('email', instance.email)
#         instance.content = validated_data.get('content', instance.content)
#         instance.created = validated_data.get('created', instance.created)
#         return instance