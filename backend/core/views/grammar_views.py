from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from core.serializers import GrammarCreateSerializer, GrammarSerializer
from core.models import Grammar


@api_view(['GET','POST'])
def grammar_list(request):

    if request.method == 'GET':
        grammars = Grammar.objects.all()
        serializer = GrammarSerializer(instance=grammars, many=True)
        
        data = {
            'grammars': serializer.data
        }

        return Response(data)
    elif request.method == 'POST':
        serializer = GrammarCreateSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(created_by=request.user)

            data ={
                'message': 'Grammar created',
                'grammar': serializer.data
            }

            return Response(data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
def grammar_detail(request, pk):

    try:
        grammar = Grammar.objects.get(pk=pk)
    except Grammar.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = GrammarSerializer(grammar)

        data = {
            'grammar': serializer.data
        }

        return Response(data)
    
    elif request.method == 'PUT':
        serializer = GrammarCreateSerializer(grammar, data=request.data)

        if serializer.is_valid():
            serializer.save()

            data = {
                'message': 'Grammar updated',
                'grammar': serializer.data
            }

            return Response(data)
        else:
             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    elif request.method == 'PATCH':
        serializer = GrammarCreateSerializer(grammar, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()

            data = {
                'message': 'Grammar updated',
                'grammar': serializer.data
            }

            return Response(data)
        else:
             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        grammar.delete()

        data = {
            'message': 'grammar deleted'
        }
        return Response(data,status=status.HTTP_204_NO_CONTENT)
     