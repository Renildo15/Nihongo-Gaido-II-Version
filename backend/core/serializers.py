from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
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

class UserCreateSerializer(serializers.ModelSerializer):
    
    #fonte: https://stackoverflow.com/questions/55906891/django-drf-simple-jwt-authenticationdetail-no-active-account-found-with-the
    def validate_password(self, value: str) -> str:
        """
        Hash value passed by user.

        :param value: password of a user
        :return: a hashed version of the password
        """
        return make_password(value)

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}