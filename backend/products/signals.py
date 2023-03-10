from django.dispatch import receiver
from django.db.models.signals import post_save, post_delete
from recommender.models import SimilarityModel
from recommender.views import train_model_init
from .models import Product


@receiver(post_save, sender=Product)
def retrain_model_on_create(sender, instance, created, **kwargs):
    if created:
        # Delete similarity model
        try:
            obj = SimilarityModel.objects.get(name="product_similarity")
            obj.delete()
        except SimilarityModel.DoesNotExist:
            pass

        # Train machine learning model
        train_model_init()


@receiver(post_delete, sender=Product)
def retrain_model_on_delete(sender, instance, **kwargs):
    # Delete similarity model
    try:
        obj = SimilarityModel.objects.get(name="product_similarity")
        obj.delete()
    except SimilarityModel.DoesNotExist:
        pass

    # Train machine learning model
    train_model_init()
