from math import prod
from rest_framework import serializers
from .models import Order, OrderItem
from products.serializers import ProductIDSerializer, ProductSerializer
from products.models import Product
import time


class ItemSerializer(serializers.ModelSerializer):
    product = ProductIDSerializer(required=True)
    # queryset = Product.objects.all()

    class Meta:
        model = OrderItem
        fields = ["quantity", "product"]


class CreateOrderSerializer(serializers.ModelSerializer):
    items = ItemSerializer(many=True, required=True)

    class Meta:
        model = Order
        fields = ["full_name", "email", "state", "city", "address", "items"]

    def validate(self, attrs):
        items = attrs["items"]
        product_ids = [item["product"]["id"] for item in items]
        # Using a set to remove duplicates
        set_product_ids = set(product_ids)

        if len(set_product_ids) != len(product_ids):
            raise serializers.ValidationError({"error": "No duplicate Product ID in items"})

        return attrs

    def create(self, validated_data):
        '''
        Creation of items and order instance
        '''

        items_data = validated_data.pop("items")  # Removing products
        total_price = 0

        for item in items_data:
            # Calculate item total price
            product = item["product"]["product"]
            total_price += (item["quantity"] * product.price)

        validated_data["total_price"] = total_price
        order = Order.objects.create(**validated_data)  # Creating order

        # Creating items
        for item in items_data:
            product = item["product"]["product"]
            total_price = item["quantity"] * product.price
            OrderItem.objects.create(order=order, product=product,
                                     total_price=total_price, quantity=item["quantity"])

        return order
