from rest_framework import serializers
from .models import Product, Image

class ImageSerializer(serializers.ModelSerializer):
    """
    Product Images serialization class
    """
    class Meta:
        model = Image
        exclude = ["id", "product"]


class ProductSerializer(serializers.ModelSerializer):
    """
    Product serialization class
    """
    images = ImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        exclude = ["created_at", "id"]