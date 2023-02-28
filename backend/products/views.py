from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
    RetrieveAPIView,
    UpdateAPIView,
    DestroyAPIView
)
from rest_framework.permissions import IsAdminUser
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

class EditBookView(UpdateAPIView):
    """
    Adnin users to update the details of a product
    """
    permission_classes = [IsAdminUser]
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

class DeleteBookView(DestroyAPIView):
    """
    Adnin users to delete a product
    """
    permission_classes = [IsAdminUser]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
