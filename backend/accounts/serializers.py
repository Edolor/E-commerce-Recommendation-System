from itsdangerous import Serializer
from rest_framework import serializers
from django.contrib.auth import authenticate

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, max_length=120)

    def validate(self, attrs):
        user = authenticate(email=attrs["email"], password=attrs["password"])
        
        if user is None:
            raise serializers.ValidationError({"error":"invalid credentials"})
        
        attrs["user"] = user

        return attrs