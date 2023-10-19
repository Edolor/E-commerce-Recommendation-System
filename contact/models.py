from django.db import models
from django.core.validators import RegexValidator
from django.db import models
from uuid import uuid4
from django.utils import timezone


class Contact(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True, unique=True)
    name = models.CharField(max_length=150, blank=False, null=False)
    phone_regex = RegexValidator(
        regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    phone = models.CharField(max_length=16, blank=False,
                             null=False, validators=[phone_regex])
    email = models.EmailField(blank=False, null=False)
    message = models.TextField(blank=False, null=False)
    created = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.name} -- {self.email}"


class Newsletter(models.Model):
    email = models.EmailField(blank=False, null=False, unique=True)
    created = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.email
