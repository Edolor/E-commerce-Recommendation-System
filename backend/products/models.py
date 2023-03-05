from math import prod
from django.db import models
from uuid import uuid4
from django.utils import timezone
from django.core.exceptions import ValidationError


def validate_postive(value):
    if value <= 0:
        raise ValidationError("Price must be greater than zero")


class Category(models.Model):
    name = models.CharField(max_length=150, blank=False, null=False)


class Product(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True, unique=True)
    name = models.CharField(max_length=150, blank=False, null=False)
    description = models.TextField(max_length=250, blank=False, null=False)
    price = models.DecimalField(
        max_digits=10, decimal_places=2, blank=False, validators=[validate_postive])
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name


class Image(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="images/")

    def __str__(self):
        return f'{self.product.name} Image'
