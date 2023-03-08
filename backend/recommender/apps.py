from django.apps import AppConfig

class RecommenderConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'recommender'

    def ready(self):
        from .views import train_model_init
        train_model_init() # Handle initial setup of model