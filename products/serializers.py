from rest_framework import serializers
from .models import Product, Image, Category


class ImageSerializer(serializers.ModelSerializer):
    """
    Product Images serialization class
    """

    class Meta:
        model = Image
        fields = ["image"]

        extra_kwargs = {
            "product": {"read_only": True}
        }


class CategorySerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        return instance.name

    class Meta:
        model = Category
        fields = ["name"]


class UrlFlattenSerializer(serializers.RelatedField):
    """
    Transform the representation and reduces the dimensions(nestedness)

    from-- images: [{ "image": "/work.jpg"}, { "image": "/thing.jpg"}]
    to-- images: ["/work.jpg", "/thing.jpg"]
    """

    def to_representation(self, value):
        return value.image.url


class ProductSerializer(serializers.ModelSerializer):
    """
    Product serialization class
    """
    url = serializers.HyperlinkedIdentityField(view_name="products:detail")
    images = UrlFlattenSerializer(many=True, read_only=True)
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Product
        fields = ["url", "id", "name", "description", "total_quantity",
                  "former_price", "price", "category", "images"]
        read_only_fields = ["id"]


class CreateProductSerializser(serializers.ModelSerializer):
    """
    Product serialization class
    """

    class Meta:
        model = Product
        fields = ["id", "name", "description", "price", "category"]
        extra_kwargs = {
            "id": {"read_only": True}
        }

    def __init__(self, instance=None, **kwargs):
        super().__init__(instance, **kwargs)


class ProductIDSerializer(serializers.Serializer):
    """
    Product serialization class
    """

    id = serializers.UUIDField(required=True)

    def validate(self, attrs):
        """Confirm if product exists"""
        try:
            product = Product.objects.get(pk=attrs["id"])
        except Product.DoesNotExist:
            raise serializers.ValidationError(
                {"error": f"Product with id={attrs['id']} does not exist."})

        attrs["product"] = product
        return attrs

    def create(self, validated_data):
        return validated_data["product"]

    def save(self):
        return self.validated_data["product"]
