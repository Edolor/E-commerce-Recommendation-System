from django.urls import path
from .views import CreateOrderView

app_name = "order"

urlpatterns = [
    path("create-order/", CreateOrderView.as_view(), name="create"),
]
