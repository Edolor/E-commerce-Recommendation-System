from django.dispatch import receiver
from django.db.models.signals import post_save
from recommender.models import SimilarityModel
from recommender.views import train_model_init
from .models import Product

@receiver(post_save, sender=Product)
def retrain_model(sender, instance, created, **kwargs):
    if created:
        # Delete similarity model
        try:
            obj = SimilarityModel.objects.get(name="product_similarity")
            obj.delete()
        except SimilarityModel.DoesNotExist:
            pass

        # Train machine learning model
        train_model_init()