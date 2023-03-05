from django.urls import path
from .views import (
    ListProductView,
    RetrieveProductView,
    EditDeleteProductView,
    CreateProductView,
    AddImageView,
    RetrieveImagesView,
)

app_name = "products"

urlpatterns = [
    path("list/", ListProductView.as_view(), name="list"),
    path("create-product/", CreateProductView.as_view(), name="create"),
    path("<uuid:pk>/", RetrieveProductView.as_view(), name="detail"),
    path("<uuid:pk>/images/", RetrieveImagesView.as_view(), name="retrieve-images"),
    path("<uuid:pk>/add-image/", AddImageView.as_view(), name="add-image"),
    path("<uuid:pk>/update/", EditDeleteProductView.as_view(), name="update"),
]
