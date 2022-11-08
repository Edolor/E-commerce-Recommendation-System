from django.urls import path
from . import views

app_name = "product" # Namespacing this app

urlpatterns = [
    path("", views.IndexView.as_view(), name="index"),
]