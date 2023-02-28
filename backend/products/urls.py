from django.urls import path
from .views import (
    ListBookView,
    RetrieveBookView,
    EditDeleteBookView,
    CreateBookView
)

app_name = "products"

urlpatterns = [
    path("list/", ListBookView.as_view(), name="list"),
    path("create/", CreateBookView.as_view(), name="create"),
    path("<uuid:pk>/", RetrieveBookView.as_view(), name="retrieve"),
    path("<uuid:pk>/update/", EditDeleteBookView.as_view(), name="update"),
]