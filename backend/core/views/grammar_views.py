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

        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = GrammarCreateSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(created_by=request.user)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)