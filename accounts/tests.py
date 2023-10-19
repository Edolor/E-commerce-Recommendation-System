from django.test import TestCase
from django.contrib.auth import get_user_model

# Create your tests here.


class AccountManagersTest(TestCase):
    def test_create_user(self):
        User = get_user_model()
        user = User.objects.create_user(email="fool@fool.com", password="fool")
        self.assertEqual(user.email, "fool@fool.com")
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)

    def test_create_superuser(self):
        User = get_user_model()
        user = User.objects.create_superuser(
            email="hate@hate.com", password="hate")
        self.assertEquals(user.email, "hate@hate.com")
        self.assertTrue(user.is_active)
        self.assertTrue(user.is_staff)
        self.assertTrue(user.is_superuser)
