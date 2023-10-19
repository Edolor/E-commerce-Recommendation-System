from django.urls import path
from .views import CreateMessage, CreateNewsletter

app_name = "contact"

urlpatterns = [
    path("create-message/", CreateMessage.as_view(), name="create"),
    path("join-newsletter/", CreateNewsletter.as_view(), name="create"),
]
