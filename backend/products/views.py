from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import ProductSerializer
from .models import Product
from django.views.generic import ListView

@api_view(["GET"])
def product_list(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def product_detail(request, pk):
    product = Product.objects.get(pk=pk)
    serializer = ProductSerializer(product)
    return Response(serializer.data)


class IndexView(ListView):
    template_name = "products/index.html"
    context_object_name = "products"
    model = Product