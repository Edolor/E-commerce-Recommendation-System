from django.urls import path
from .views import (
    ListProductView,
    RetrieveProductView,
    EditDeleteProductView,
    CreateProductView,
    AddImageView,
    ListImageView,
)

app_name = "products"

urlpatterns = [
    path("list/", ListProductView.as_view(), name="list"),
    path("list-images/", ListImageView.as_view(), name="list-images"),
    path("create-product/", CreateProductView.as_view(), name="create"),
    path("<uuid:pk>/", RetrieveProductView.as_view(), name="retrieve"),
    path("<uuid:pk>/add-image/", AddImageView.as_view(), name="add-image"),
    path("<uuid:pk>/update/", EditDeleteProductView.as_view(), name="update"),
]