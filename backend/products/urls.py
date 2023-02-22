from django.urls import path
from . import views

app_name = "products"
urlpatterns = [
    path("list/", views.product_list, name="product-list"),
    path("detail/", views.product_detail, name="product-detail"),
]