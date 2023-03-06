from django.db import models

from django.db import models
from uuid import uuid4
from django.utils import timezone


class Contact(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True, unique=True)
    name = models.CharField(max_length=150, blank=False, null=False)
    phone = models.CharField(max_length=14, blank=False, null=False)
    email = models.EmailField(blank=False, null=False)
    message = models.TextField(blank=False, null=False)
    created = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.name} -- {self.email}"
