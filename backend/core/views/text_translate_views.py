from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from core.models import Text, TextTranslate
from core.serializers import TextTranslateSerializer, TextTranslateCreateSerializer


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def text_translate_list(request, text_id):
    try:
        text = Text.objects.get(pk=text_id)
    except Text.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        text_translate = TextTranslate.objects.get(
            created_by=request.user, text_original=text
        )
        serializer = TextTranslateSerializer(text_translate)

        data = {"text": serializer.data}

        return Response(data)

    elif request.method == "POST":
        serializer = TextTranslateCreateSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(created_by=request.user, text=text)

            data = {
                "message": "Text Translate created successfully",
                "text": serializer.data,
            }
            return Response(data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PATCH", "DELETE"])
@permission_classes([IsAuthenticated])
def text_translate_detail(request, text_id, text_translate_id):
    try:
        text = Text.objects.get(pk=text_id)
    except Text.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    try:
        text_translate = TextTranslate.objects.get(
            pk=text_translate_id, text_original=text
        )
    except TextTranslate.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "PATCH":
        serializer = TextTranslateSerializer(
            text_translate, data=request.data, partial=True
        )

        if serializer.is_valid():
            serializer.save()

            data = {
                "message": "Text Translate updated successfully",
                "text": serializer.data,
            }

            return Response(data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        text_translate.delete()
        data = {
            "message": "Text Translate deleted successfully",
        }
        return Response(data, status=status.HTTP_204_NO_CONTENT)
