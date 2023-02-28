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
from .serializers import ProductSerializer
from .models import Product

class ListBookView(ListAPIView):
    """
    Display all available products
    """
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

class RetrieveBookView(RetrieveAPIView):
    """
    Fetch the details of a product
    """
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

class CreateBookView(CreateAPIView):
    """
    Adnin users to create a product
    """
    permission_classes = [IsAdminUser]
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

class EditDeleteBookView(UpdateModelMixin, DestroyModelMixin, GenericAPIView):
    """
    Adnin users to update the details of a product
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

