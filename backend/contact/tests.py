from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse


class ContactTestCase(APITestCase):
    def setUp(self):
        self.data = {
            "name": "John doe",
            "email": "johm@gmail.com",
            "phone": "+2348082323290",
            "message": "I am enquiring about something"
        }

        self.invalid_data_0 = {
            "name": "",
            "email": "johm@gmail.com",
            "phone": "+2348082323290",
            "message": "I am enquiring about something"
        }

        self.invalid_data_1 = {
            "name": "John doe",
            "email": "johm",
            "phone": "+2348082323290",
            "message": "I am enquiring about something"
        }

        self.invalid_data_2 = {
            "name": "John doe",
            "email": "johm@gmail.com",
            "phone": "+2348082323290",
            "message": ""
        }

        self.invalid_data_3 = {
            "name": "John doe",
            "email": "",
            "phone": "+2348082323290",
            "message": "I am enquiring about something"
        }

    def test_create_contact(self):
        response = self.client.post(reverse("contact:create"), self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_contact_err(self):
        """
        Testing creation of contact message with incomplete data
        """
        response = self.client.post(
            reverse("contact:create"), self.invalid_data_0)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        response = self.client.post(
            reverse("contact:create"), self.invalid_data_1)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        response = self.client.post(
            reverse("contact:create"), self.invalid_data_2)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        response = self.client.post(
            reverse("contact:create"), self.invalid_data_3)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
