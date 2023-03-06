from django.urls import path
from .views import CreateMessage

app_name = "contact"

urlpatterns = [
    path("create-message/", CreateMessage.as_view(), name="create"),
]
