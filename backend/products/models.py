from math import prod
from django.db import models
from uuid import uuid4
from django.utils import timezone
from recommender.models import SimilarityModel
from recommender.views import train_model_init
from django.core.exceptions import ValidationError


def validate_postive(value):
    if value <= 0:
        raise ValidationError("Price must be greater than zero")


class Category(models.Model):
    name = models.CharField(max_length=150, blank=False, null=False)

    def __str__(self):
        return self.name


class Product(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True, unique=True)
    category = models.ForeignKey(
        Category, related_name="products", on_delete=models.CASCADE)
    name = models.CharField(max_length=150, blank=False, null=False)
    description = models.TextField(max_length=250, blank=False, null=False)
    price = models.PositiveIntegerField(blank=False)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["-created_at"]

    def save(self, *args, **kwargs):
        # Delete similarity model
        try:
            obj = SimilarityModel.objects.get(name="product_similarity")
            obj.delete()
        except SimilarityModel.DoesNotExist:
            pass

        # Train machine learning model
        train_model_init()
        
        return super().save( *args, **kwargs)


class Image(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="images/")

    def __str__(self):
        return f'{self.product.name} Image'
