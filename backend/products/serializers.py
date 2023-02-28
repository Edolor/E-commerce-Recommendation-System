from rest_framework import serializers
from .models import Product, Image

class ImageSerializer(serializers.ModelSerializer):
    """
    Product Images serialization class
    """

    class Meta:
        model = Image
        fields = "__all__"

        extra_kwargs = {
            "product": {"read_only": True}
        }


class ProductSerializer(serializers.ModelSerializer):
    """
    Product serialization class
    """
    images = ImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ["id", "name", "description", "price", "images"]
        read_only_fields = ["id"]