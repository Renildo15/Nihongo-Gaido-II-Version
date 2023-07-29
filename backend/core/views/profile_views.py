from core.models import Profile
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from core.serializers import ProfileSerializer

@api_view(['GET','PATCH'])
def profile_list(request, user_id):

    try:
        profile = Profile.objects.get(user=user_id)
    except Profile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ProfileSerializer(profile)

        data ={
            'profile': serializer.data
        }

        return Response(data)
    
    elif request.method == 'PATCH':
        serializer = ProfileSerializer(profile, data=request.data)

        if serializer.is_valid():

            serializer.save()

            data = {
                'message': 'Profile updated',
                'profile': serializer.data
            }

            return Response(data)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
