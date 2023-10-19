from rest_framework import status
from rest_framework.response import Response
from .serializers import CreateContactMSG, NewsletterSerializer
from rest_framework.generics import GenericAPIView
from rest_framework.throttling import ScopedRateThrottle


class CreateMessage(GenericAPIView):
    """
    View used to create a message by an anonymous user
    """

    serializer_class = CreateContactMSG
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "contact-message"

    def post(self, request):
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        serializer.save()
        data = {
            "success": True,
            "response": "Message created"
        }

        return Response(data, status=status.HTTP_201_CREATED)


class CreateNewsletter(GenericAPIView):
    """
    Creation of a newsletter an anonymous user
    """

    serializer_class = NewsletterSerializer
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "contact-newsletter"

    def post(self, request):
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        serializer.save()
        data = {
            "success": True,
            "response": "Newsletter subscription successful."
        }

        return Response(data, status=status.HTTP_201_CREATED)
