from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

class HealthCheck(APIView):
    """Health Check path used for checking the health of the application"""
    def get(self, request):
        return Response({"status": "Ok"}, status=status.HTTP_200_OK)