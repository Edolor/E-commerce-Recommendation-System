from rest_framework import serializers
from .models import Contact, Newsletter


class CreateContactMSG(serializers.ModelSerializer):
    """
    Used to structure the creation of a contact message
    """
    class Meta:
        model = Contact
        fields = ["name", "email", "phone", "message"]

class NewsletterSerializer(serializers.ModelSerializer):
    """
    Used to structure the creation of a contact message
    """
    class Meta:
        model = Newsletter
        fields = ["email",]
