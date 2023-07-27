from rest_framework import serializers
from core.models import Grammar


class GrammarCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Grammar
        fields = ['grammar', 'structure', 'level', 'explain']

    

class GrammarSerializer(serializers.ModelSerializer):
     class Meta:
        model = Grammar
        fields = ['id','grammar', 'structure', 'level', 'explain', 'created_by', 'created_at', 'updated_at']
        extra_kwargs = {'created_by': {'read_only':True}}