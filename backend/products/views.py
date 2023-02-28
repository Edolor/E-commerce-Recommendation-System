from genericpath import exists
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
    RetrieveAPIView,
    GenericAPIView
)
from rest_framework.mixins import UpdateModelMixin, DestroyModelMixin
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from .serializers import ProductSerializer, ImageSerializer
from .models import Product, Image
from django.core.exceptions import ValidationError
from rest_framework.parsers import MultiPartParser

class ListProductView(ListAPIView):
    """
    Display all available products
    """
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

class RetrieveProductView(RetrieveAPIView):
    """
    Fetch the details of a product
    """
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

class CreateProductView(CreateAPIView):
    """
    Adnin users view used to create a product
    """
    permission_classes = [IsAdminUser]
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

class EditDeleteProductView(UpdateModelMixin, DestroyModelMixin, GenericAPIView):
    """
    Adnin users view used to update the details of a product
    """
    permission_classes = [IsAdminUser]
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

class ListImageView(ListAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer


class AddImageView(CreateAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    parser_classes = [MultiPartParser]
    permission_classes = [IsAdminUser]

    def perform_create(self, serializer):
        pk = self.kwargs["pk"]
        product = Product.objects.filter(pk=pk)
        print(product)

        if product.exists() == False:
            raise ValidationError("Product does not exist")

        serializer.save(product=product[0])