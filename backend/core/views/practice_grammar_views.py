from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
import random

from core.serializers import PracticeGrammarSerializer, GrammarSerializer
from core.models import Grammar, PracticeGrammar



@api_view(['GET','POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def choice_grammar(request):
    grammars = Grammar.objects.filter(created_by=request.user)
    grammar = random.choice(grammars)

    if request.method == 'GET':     
        serializer = GrammarSerializer(instance=grammar)

        data={
            "chosen_grammar": serializer.data
        }

        return Response(data)
    elif request.method == 'POST':

        serializer = PracticeGrammarSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(grammar = grammar, created_by=request.user)

            data = {
                "message": "Practice grammar created",
                "setence": serializer.data
            }
            return Response(data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   
@api_view(['PATCH', 'DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def choice_grammar_detail(request, pk):
    try:
        setence = PracticeGrammar.objects.get(pk=pk)
    except PracticeGrammar.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'PATCH':
        serializer = PracticeGrammarSerializer(setence, data=request.data)

        if serializer.is_valid():
            serializer.save()

            data = {
                'message': 'Practice grammar updated',
                'setence': serializer.data
            }

            return Response(data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        setence.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
    

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def setence_list(request):
    setences = PracticeGrammar.objects.filter(created_by=request.user)
    serializer = PracticeGrammarSerializer(instance=setences, many=True)

    data = {
        "setences": serializer.data
    }

    return Response(data)