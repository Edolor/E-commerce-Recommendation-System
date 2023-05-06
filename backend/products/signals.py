from django.dispatch import receiver
from django.db.models.signals import post_save, post_delete
from recommender.models import SimilarityModel
from recommender.views import train_model_init
from .models import Product, Image


@receiver(post_save, sender=Product)
def retrain_model_on_create(sender, instance, created, **kwargs):
    """
    Retrains recommender model when a product is added.
    """
    try:
        obj = SimilarityModel.objects.get(name="product_similarity")
        obj.delete()
    except SimilarityModel.DoesNotExist:
        pass

    try:
        # Train machine learning model
        train_model_init()
    except:
        pass


@receiver(post_delete, sender=Product)
def retrain_model_on_delete(sender, instance, **kwargs):
    """
    Retrain recommender model when a product is deleted
    """
    # Delete similarity model
    try:
        obj = SimilarityModel.objects.get(name="product_similarity")
        obj.delete()
    except SimilarityModel.DoesNotExist:
        pass

    # Train machine learning model
    train_model_init()

@receiver(post_delete, sender=Image)
def remove_image(sender, instance, **kwargs):
    """
    Delete image when product is being deleted
    """
    try:        
        instance.image.delete(save=False)
    except:
        pass

@receiver(post_save, sender=Image)
def update_image(sender, instance, *args, **kwargs):
    """
    Delete old image and update it with a new image if available
    """
    try:
        # Get old image
        old_image = Image.objects.get(id=instance.id).image.path

        # Get new image
        try:
            new_image = instance.image.path
        except:
            new_image = None
            return False
        
        # Check if old image and new image are the same
        if old_image != new_image:
            import os
            if os.path.exists(old_image): # Change to check google drive and then remove
                os.remove(old_image)

    except:
        pass
