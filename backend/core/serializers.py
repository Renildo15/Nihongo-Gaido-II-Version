from rest_framework import serializers
from core.models import Grammar
import re

class GrammarCreateSerializer(serializers.ModelSerializer):

    def validate_grammar(self, value):
        pattern = r'^[a-zA-Z-~ ]+$' 

        if not re.match(pattern, value):
            raise serializers.ValidationError("O campo 'grammar' deve conter apenas letras, '-', '~'.")
        
        return value

    def validate_structure(self, value):
        pattern = r'^[ぁ-んァ-ン一-龯+/~]+$'

        if not re.match(pattern, value):
            raise serializers.ValidationError("O campo 'structure' deve conter apenas letras japonesas, '+', '/', '~'.")
        
        return value
        

    class Meta:
        model = Grammar
        fields = ['grammar', 'structure', 'level', 'explain']

    

class GrammarSerializer(serializers.ModelSerializer):
     class Meta:
        model = Grammar
        fields = ['id','grammar', 'structure', 'level', 'explain', 'created_by', 'created_at', 'updated_at']
        extra_kwargs = {'created_by': {'read_only':True}}