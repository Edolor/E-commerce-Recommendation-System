from django.urls import path
from .views import ProductList, ProductDetail

app_name = "products"
urlpatterns = [
    path("list/", ProductList.as_view(), name="product-list"),
    path("detail/<uuid:pk>/", ProductDetail.as_view(), name="product-detail"),
]