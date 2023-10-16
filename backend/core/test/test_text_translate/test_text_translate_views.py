from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient

from core.models import Text, TextTranslate


class TextTranslateTestsViews(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser", password="testpassword"
        )
        self.text = Text.objects.create(
            title="神のイタズラ",
            text="""
                    ある日、神様が、人間の世界を見ていました。
                    すると、人間たちが、いろいろなことで、争っているのが見えました。
                    神様は、人間たちに、争いをやめるように、言いました。
                """,
            annotation="teste",
            created_by=self.user,
        )
        self.text_translate = TextTranslate.objects.create(
            title="Travessuras de Deus",
            text="""
                    Um dia, Deus estava olhando para o mundo dos humanos.
                    Então, ele viu os humanos brigando por várias coisas.
                    Deus disse aos humanos para pararem de brigar.
                """,
            text_original=self.text,
            created_by=self.user,
        )

        self.client = APIClient()

    def test_text_translate_list(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(f"/api/text_translate/{self.text.id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["text"]["title"], self.text_translate.title)
        self.assertEqual(response.data["text"]["text"], self.text_translate.text)

    def test_text_translate_list_not_found(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(f"/api/text_translate/{999}/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_text_translate_create(self):
        self.client.force_authenticate(user=self.user)
        text_two = Text.objects.create(
            title="神のイタズラ",
            text="""
                    ある日、神様が、人間の世界を見ていました。
                    すると、人間たちが、いろいろなことで、争っているのが見えました。
                    神様は、人間たちに、争いをやめるように、言いました。
                """,
            annotation="teste",
            created_by=self.user,
        )
        response = self.client.post(
            f"/api/text_translate/{self.text.id}/",
            {
                "title": "Travessuras de Deus",
                "text": """
                    Um dia, Deus estava olhando para o mundo dos humanos.
                    Então, ele viu os humanos brigando por várias coisas.
                    Deus disse aos humanos para pararem de brigar.
                """,
                "text_original": text_two.id,
                "created_by": self.user.id,
            },
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_text_translate_create_not_found(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(
            f"/api/text_translate/{9999}/",
            {
                "title": "Travessuras de Deus",
                "text": """
                    Um dia, Deus estava olhando para o mundo dos humanos.
                    Então, ele viu os humanos brigando por várias coisas.
                    Deus disse aos humanos para pararem de brigar.
                """,
                "created_by": self.user.id,
            },
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_text_translate_create_invalid_data(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(
            f"/api/text_translate/{self.text.id}/",
            {"title": "", "text": "", "created_by": self.user.id},
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_text_translate_update(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.patch(
            f"/api/text_translate_detail/{self.text.id}/{self.text_translate.id}/",
            {"title": "Travessuras de Deus"},
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_text_translate_update_text_id_not_found(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.patch(
            f"/api/text_translate_detail/{999}/{self.text_translate.id}/",
            {"title": "Travessuras de Deus"},
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_text_translate_update_translate_id_not_found(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.patch(
            f"/api/text_translate_detail/{self.text.id}/{999}/",
            {"title": "Travessuras de Deus"},
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_text_translate_update_both_id_not_found(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.patch(
            f"/api/text_translate_detail/{999}/{999}/", {"title": "Travessuras de Deus"}
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_text_translate_update_invalid_data(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.patch(
            f"/api/text_translate_detail/{self.text.id}/{self.text_translate.id}/",
            {"title": ""},
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_text_translate_delete(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.delete(
            f"/api/text_translate_detail/{self.text.id}/{self.text_translate.id}/"
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_text_translate_delete_text_id_not_found(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.delete(
            f"/api/text_translate_detail/{999}/{self.text_translate.id}/"
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_text_translate_delete_translate_id_not_found(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.delete(
            f"/api/text_translate_detail/{self.text.id}/{999}/"
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_text_translate_delete_both_id_not_found(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.delete(f"/api/text_translate_detail/{999}/{999}/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
