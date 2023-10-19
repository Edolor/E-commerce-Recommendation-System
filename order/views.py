from rest_framework.generics import CreateAPIView
from .serializers import CreateOrderSerializer
from .models import Order


class CreateOrderView(CreateAPIView):
    serializer_class = CreateOrderSerializer
    queryset = Order.objects.all()