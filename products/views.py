from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
    UpdateAPIView,
    GenericAPIView
)
from rest_framework.permissions import IsAdminUser
from .serializers import (
    ProductSerializer,
    ImageSerializer,
    CreateProductSerializser
)
from .models import Product, Image
from django.core.exceptions import ValidationError
from rest_framework.parsers import MultiPartParser
from .pagination import ProductPagination
from recommender.views import get_similar_products
from rest_framework import filters
from rest_framework.throttling import ScopedRateThrottle, AnonRateThrottle


class ListProductView(ListAPIView):
    """
    Display all available products
    """
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    pagination_class = ProductPagination
    filter_backends = [filters.SearchFilter]
    search_fields = ["name"]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "project-list"

    def get_serializer_context(self):
        """
        Change absolute product url to relative
        """
        response = super().get_serializer_context()
        response["request"] = None
        return response


class RetrieveProductView(GenericAPIView):
    """
    Fetch the details of a product
    """

    def get(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)

            serializer = ProductSerializer(product, context={"request": None})
            data = serializer.data

            # Recommendation system plugs in here
            ids = get_similar_products(data["id"])
            other_products = Product.objects.filter(id__in=ids)

            other_p_serializer = ProductSerializer(
                other_products, many=True, context={"request": None})
            data["recommended_products"] = other_p_serializer.data
            return Response(data, status=status.HTTP_200_OK)
        except:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)


class CreateProductView(CreateAPIView):
    """
    Adnin users view used to create a product
    """
    permission_classes = [IsAdminUser]
    serializer_class = CreateProductSerializser
    queryset = Product.objects.all()
    throttle_classes = [AnonRateThrottle]
    throttle_scope = "anon-block"


class EditDeleteProductView(UpdateAPIView):
    """
    Admin users view used to update the details of a product
    """
    permission_classes = [IsAdminUser]
    serializer_class = CreateProductSerializser
    queryset = Product.objects.all()
    throttle_classes = [AnonRateThrottle]
    throttle_scope = "anon-block"

    def delete(self, request, pk):
        obj = self.get_object()
        obj.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


class RetrieveImagesView(ListAPIView):
    """
    Gets all the images for a specific product
    """
    serializer_class = ImageSerializer

    def get_queryset(self):
        """
        Return a collection of images if found
        """
        pk = self.kwargs["pk"]

        product = Product.objects.filter(pk=pk)

        if product.exists() == False:
            raise ValidationError("Product does not exist")

        images = Image.objects.filter(product=product[0])

        return images


class AddImageView(CreateAPIView):
    """
    Adnin users send a MultiPart request to add image to a specific product
    """
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    parser_classes = [MultiPartParser]
    permission_classes = [IsAdminUser]
    throttle_classes = [AnonRateThrottle]
    throttle_scope = "anon-block"

    def perform_create(self, serializer):
        pk = self.kwargs["pk"]
        product = Product.objects.filter(pk=pk)
        print(product)

        if product.exists() == False:
            raise ValidationError("Product does not exist")

        serializer.save(product=product[0])
