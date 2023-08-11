from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.db.models import Q

from core.models import Category
from core.serializers import CategorySerializer, CategoryCreateSerializer


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def category_list(request):
    if request.method == 'GET':
        categories = Category.objects.filter(Q(is_created_by_user=False) | Q(created_by=request.user))
        serializer = CategorySerializer(categories, many=True)

        data = {
            'categories': serializer.data
        }

        return Response(data)
    elif request.method == 'POST':
        serializer = CategoryCreateSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(created_by=request.user, is_created_by_user=True)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
@api_view(['GET', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def category_detail(request, pk):
    try:
        category = Category.objects.get(pk=pk)
    except Category.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serialzer = CategorySerializer(category)

        data = {
            'category': serialzer.data
        }

        return Response(data)
    elif request.method == 'PATCH':
        serializer = CategoryCreateSerializer(category, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)