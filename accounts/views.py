from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .serializers import LoginSerializer
from rest_framework import serializers

# Create your views here.
class LoginView(GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        data = {}
        user = serializer.validated_data["user"]
        token = Token.objects.get_or_create(user=user)
        data["token"] = token[0].key

        return Response(data, status=status.HTTP_200_OK)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        token = request.user.auth_token
        token.delete()

        data = {
            "success": True,
            "message": "Logout successfult"
        }
        return Response(data, status=status.HTTP_200_OK)