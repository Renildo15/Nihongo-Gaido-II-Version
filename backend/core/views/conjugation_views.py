from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from core.models import Conjugation, Word
from core.serializers import ConjugationCreateSerializer, ConjugationSerializer
from core.utils.paginationn import CustomPagination


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def conjugation_list(request, word_id):
    
    try:
        word = Word.objects.get(pk=word_id)
    except Word.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "GET":
        
        conjugation = Conjugation.objects.filter(created_by=request.user, word=word)
        
        paginator = CustomPagination()  
        result_page = paginator.paginate_queryset(conjugation, request)
        serializer = ConjugationSerializer(result_page)
        
        return paginator.get_paginated_response(serializer.data)

    elif request.method == "POST":
        serializer = ConjugationCreateSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(created_by=request.user, word=word)

            data = {
                "message": "Conjugation created successfully",
                "word": serializer.data,
            }

            return Response(data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else: 
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(["PATCH", "DELETE"])
@permission_classes([IsAuthenticated])
def conjugation_detail(request, word_id, conjugation_id):
    try:
        word = Word.objects.get(pk=word_id)
    except Word.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    try:
        conjugation = Conjugation.objects.get(pk=conjugation_id, word=word)
    except Conjugation.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "PATCH":
        serializer = ConjugationCreateSerializer(
            conjugation, data=request.data, partial=True
        )

        if serializer.is_valid():
            serializer.save()

            data = {
                "message": "Conjugation updated successfully",
                "word": serializer.data,
            }

            return Response(data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        conjugation.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
