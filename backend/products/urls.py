from django.urls import path
from .views import (
    ListBookView,
    RetrieveBookView,
    EditBookView,
    DeleteBookView,
    CreateBookView
)

app_name = "products"

urlpatterns = [
    path("list/", ListBookView.as_view(), name="list"),
    path("create/", CreateBookView.as_view(), name="create"),
    path("detail/<uuid:pk>/", RetrieveBookView.as_view(), name="retrieve"),
    path("update/<uuid:pk>/", EditBookView.as_view(), name="update"),
    path("delete/<uuid:pk>/", DeleteBookView.as_view(), name="delete"),
]