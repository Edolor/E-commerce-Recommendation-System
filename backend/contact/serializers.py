from rest_framework import serializers
from .models import Contact


class CreateContactMSG(serializers.ModelSerializer):
    """
    Used to structure the creation of a contact message
    """
    class Meta:
        model = Contact
        fields = ["name", "email", "phone", "message"]
