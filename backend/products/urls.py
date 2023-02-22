from django.urls import path
from . import views

app_name = "products"
urlpatterns = [
    path("", views.IndexView.as_view(), name="index-view"),
    path("list/", views.product_list, name="product-list"),
    path("detail/<uuid:pk>/", views.product_detail, name="product-detail"),
]