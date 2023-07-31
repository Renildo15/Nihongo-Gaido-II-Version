from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from core.models import Grammar, Profile, PracticeGrammar
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

    def validate_first_name(self, value):
        pattern = r'^[a-zA-Z ]+$' 

        if not re.match(pattern, value):
            raise serializers.ValidationError("O campo 'first_name' deve conter apenas letras")
        
        return value
    
    def validate_last_name(self, value):
        pattern = r'^[a-zA-Z ]+$' 

        if not re.match(pattern, value):
            raise serializers.ValidationError("O campo 'last_name' deve conter apenas letras")
        
        return value

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

class ProfileSerializer(serializers.ModelSerializer):
    user = UserCreateSerializer(read_only=True)
    avatar = serializers.ImageField(required=False)

    def validate_phone(self, value):
        pattern = r'^\d+$'

        if not re.match(pattern, value):
             raise serializers.ValidationError("O campo 'phone' deve conter apenas números")
        
        return value


    class Meta:
        model = Profile
        fields = ['id', 'user', 'phone', 'date_of_birth', 'avatar', 'date_created']

class PracticeGrammarSerializer(serializers.ModelSerializer):

    class Meta:
        model = PracticeGrammar
        fields = ['id', 'grammar', 'first_setence', 'second_setence', 'third_setence', 'created_by', 'created_at', 'updated_at']
