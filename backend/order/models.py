from django.db import models
from django.utils import timezone
from uuid import uuid4
from products.models import Product


class Order(models.Model):
    statuses = [
        ("pending", "Pending"),
        ("failed", "Failed"),
        ("success", "Success")
    ]
    id = models.UUIDField(default=uuid4, primary_key=True, unique=True)
    full_name = models.CharField(max_length=120, blank=False, null=False)
    email = models.CharField(max_length=150, blank=False, null=False)
    status = models.CharField(
        max_length=7,
        choices=statuses,
        null=False,
        blank=False,
        default="pending"
    )
    state = models.CharField(max_length=60, blank=False, null=False)
    city = models.CharField(max_length=60, blank=False, null=False)
    address = models.TextField(blank=False, null=False)
    total_price = models.FloatField(null=False, blank=False)  # Read only field
    date_created = models.DateTimeField(default=timezone.now)

    def __str__(self) -> str:
        return f"{self.full_name}--{self.total_price}--{self.date_created}"


class OrderItem(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True, unique=True)
    quantity = models.PositiveIntegerField(blank=False, null=False)
    total_price = models.FloatField(blank=False, null=False)
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="orders")
    order = models.ForeignKey(
        Order, on_delete=models.CASCADE, related_name="items")

    def __str__(self) -> str:
        return f"(Qty: {self.quantity}), (Product Name: {self.product.name}), (Total Price: {self.total_price}), (Order ID: {self.order.id})"
