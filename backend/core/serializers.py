from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from core.models import *
import re


class GrammarCreateSerializer(serializers.ModelSerializer):
    def validate_grammar(self, value):
        pattern = r"^[a-zA-Z-~ ]+$"

        if not re.match(pattern, value):
            raise serializers.ValidationError(
                "O campo 'grammar' deve conter apenas letras, '-', '~'."
            )

        return value

    def validate_structure(self, value):
        pattern = r"^[ぁ-んァ-ン一-龯+/~]+$"

        if not re.match(pattern, value):
            raise serializers.ValidationError(
                "O campo 'structure' deve conter apenas letras japonesas, '+', '/', '~'."
            )

        return value

    class Meta:
        model = Grammar
        fields = ["grammar", "structure", "level", "explain"]


class GrammarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grammar
        fields = [
            "id",
            "grammar",
            "structure",
            "level",
            "explain",
            "created_by",
            "created_at",
            "updated_at",
        ]
        extra_kwargs = {"created_by": {"read_only": True}}


class UserCreateSerializer(serializers.ModelSerializer):
    # fonte: https://stackoverflow.com/questions/55906891/django-drf-simple-jwt-authenticationdetail-no-active-account-found-with-the
    def validate_password(self, value: str) -> str:
        """
        Hash value passed by user.

        :param value: password of a user
        :return: a hashed version of the password
        """
        return make_password(value)

    def validate_first_name(self, value):
        pattern = r"^[a-zA-Z ]+$"

        if not re.match(pattern, value):
            raise serializers.ValidationError(
                "O campo 'first_name' deve conter apenas letras"
            )

        return value

    def validate_last_name(self, value):
        pattern = r"^[a-zA-Z ]+$"

        if not re.match(pattern, value):
            raise serializers.ValidationError(
                "O campo 'last_name' deve conter apenas letras"
            )

        return value

    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "username", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}}

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "username", "email"]
        
class ProfileSerializer(serializers.ModelSerializer):
    user = UserCreateSerializer(read_only=True)
    avatar = serializers.ImageField(required=False)

    def validate_phone(self, value):
        pattern = r"^\d+$"

        if not re.match(pattern, value):
            raise serializers.ValidationError(
                "O campo 'phone' deve conter apenas números"
            )

        return value

    class Meta:
        model = Profile
        fields = ["id", "user", "phone", "date_of_birth", "avatar", "date_created"]


class PracticeGrammarSerializer(serializers.ModelSerializer):
    grammar = GrammarSerializer(read_only=True)

    def validate_first_setence(self, value):
        pattern = r"^[ぁ-んァ-ン一-龯+/~]+$"

        if not re.match(pattern, value):
            raise serializers.ValidationError(
                "O campo 'first_sentence' deve conter apenas letras japonesas"
            )

        return value

    def validate_second_setence(self, value):
        pattern = r"^[ぁ-んァ-ン一-龯+/~]+$"

        if not re.match(pattern, value):
            raise serializers.ValidationError(
                "O campo 'second_sentence' deve conter apenas letras japonesas"
            )

        return value

    def validate_third_setence(self, value):
        pattern = r"^[ぁ-んァ-ン一-龯+/~]+$"

        if not re.match(pattern, value):
            raise serializers.ValidationError(
                "O campo 'third_sentence' deve conter apenas letras japonesas"
            )

        return value

    class Meta:
        model = PracticeGrammar
        fields = [
            "id",
            "grammar",
            "first_sentence",
            "second_sentence",
            "third_sentence",
            "created_by",
            "created_at",
            "updated_at",
        ]


class SentenceCreateSerializer(serializers.ModelSerializer):
    def validate_setence(self, value):
        pattern = r"^[ぁ-んァ-ン一-龯+/~]+$"

        if not re.match(pattern, value):
            raise serializers.ValidationError(
                "O campo 'sentence' deve conter apenas letras japonesas"
            )

        return value

    class Meta:
        model = Sentence
        fields = ["id", "sentence", "translate", "annotation", "grammar", "created_by"]


class SentenceListSerializer(serializers.ModelSerializer):
    grammar = GrammarSerializer(read_only=True)

    class Meta:
        model = Sentence
        fields = [
            "id",
            "sentence",
            "translate",
            "annotation",
            "grammar",
            "created_by",
            "created_at",
            "updated_at",
        ]


class CategoryCreateSerializer(serializers.ModelSerializer):
    def validate_name(self, value):
        pattern = r"^[a-zA-Z ]+$"

        if not re.match(pattern, value):
            raise serializers.ValidationError(
                "O campo 'name' deve conter apenas letras"
            )

        return value

    class Meta:
        model = Category
        fields = ["name"]


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = [
            "id",
            "name",
            "is_created_by_user",
            "created_by",
            "created_at",
            "updated_at",
        ]


class WordCreateSerializer(serializers.ModelSerializer):
    def validate_word(self, value):
        pattern = r"^[ぁ-んァ-ン一-龯+/~]+$"

        if not re.match(pattern, value):
            raise serializers.ValidationError(
                "O campo 'word' deve conter apenas letras japonesas."
            )

        return value

    def validate_reading(self, value):
        pattern = r"^[ぁ-んァ-ン一-龯+/~]+$"

        if not re.match(pattern, value):
            raise serializers.ValidationError(
                "O campo 'reading' deve conter apenas letras japonesas."
            )

        return value

    def validate_meaning(self, value):
        pattern = r"^[a-zA-Z]+$"

        if not re.match(pattern, value):
            raise serializers.ValidationError(
                "O campo 'meaning' deve conter apenas letras."
            )

        return value

    class Meta:
        model = Word
        fields = ["word", "reading", "meaning", "type", "level", "category"]


class WordSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Word
        fields = [
            "id",
            "word",
            "reading",
            "meaning",
            "type",
            "level",
            "category",
            "created_by",
            "created_at",
            "updated_at",
        ]


class ConjugationCreateSerializer(serializers.ModelSerializer):
    def validate_word(self, value):
        pattern = r"^[ぁ-んァ-ン一-龯+/~]+$"

        if not re.match(pattern, value):
            raise serializers.ValidationError(
                "O campo 'word' deve conter apenas letras japonesas."
            )

        return value

    def validate_present(self, value):
        pattern = r"^[ぁ-んァ-ン一-龯]+$"

        if not re.match(pattern, value):
            raise serializers.ValidationError(
                "O campo 'present' deve conter apenas letras japonesas."
            )

        return value

    def validate_negative(self, value):
        pattern = r"^[ぁ-んァ-ン一-龯]+$"

        if not re.match(pattern, value):
            raise serializers.ValidationError(
                "O campo 'negative' deve conter apenas letras japonesas."
            )

        return value

    def validate_past(self, value):
        pattern = r"^[ぁ-んァ-ン一-龯]+$"

        if not re.match(pattern, value):
            raise serializers.ValidationError(
                "O campo 'past' deve conter apenas letras japonesas."
            )

        return value

    def validate_te_form(self, value):
        pattern = r"^[ぁ-んァ-ン一-龯]+$"

        if not re.match(pattern, value):
            raise serializers.ValidationError(
                "O campo 'te_form' deve conter apenas letras japonesas."
            )

        return value

    def validate_volitional(self, value):
        pattern = r"^[ぁ-んァ-ン一-龯]+$"

        if not re.match(pattern, value):
            raise serializers.ValidationError(
                "O campo 'volitional' deve conter apenas letras japonesas."
            )

        return value

    def validate_passive(self, value):
        pattern = r"^[ぁ-んァ-ン一-龯]+$"

        if not re.match(pattern, value):
            raise serializers.ValidationError(
                "O campo 'passive' deve conter apenas letras japonesas."
            )

        return value

    def validate_causative(self, value):
        pattern = r"^[ぁ-んァ-ン一-龯]+$"

        if not re.match(pattern, value):
            raise serializers.ValidationError(
                "O campo 'causative' deve conter apenas letras japonesas."
            )

        return value

    def validate_potential(self, value):
        pattern = r"^[ぁ-んァ-ン一-龯]+$"

        if not re.match(pattern, value):
            raise serializers.ValidationError(
                "O campo 'potential' deve conter apenas letras japonesas."
            )

        return value

    def validate_imperative(self, value):
        pattern = r"^[ぁ-んァ-ン一-龯]+$"

        if not re.match(pattern, value):
            raise serializers.ValidationError(
                "O campo 'imperative' deve conter apenas letras japonesas."
            )

        return value

    def validate_conditional(self, value):
        pattern = r"^[ぁ-んァ-ン一-龯]+$"

        if not re.match(pattern, value):
            raise serializers.ValidationError(
                "O campo 'conditional' deve conter apenas letras japonesas."
            )

        return value

    class Meta:
        model = Conjugation
        fields = [
            "word",
            "present",
            "negative",
            "past",
            "te_form",
            "volitional",
            "passive",
            "causative",
            "potential",
            "imperative",
            "conditional",
        ]


class ConjugationSerializer(serializers.ModelSerializer):
    word = WordSerializer(read_only=True)

    class Meta:
        model = Conjugation
        fields = [
            "id",
            "word",
            "present",
            "negative",
            "past",
            "te_form",
            "volitional",
            "passive",
            "causative",
            "potential",
            "imperative",
            "conditional",
            "created_by",
            "created_at",
            "updated_at",
        ]


class ExampleCreateSerializer(serializers.ModelSerializer):
    def validate_example(self, value):
        pattern = r"^[ぁ-んァ-ン一-龯+/~ ]+$"

        if not re.match(pattern, value):
            raise serializers.ValidationError(
                "O campo 'example' deve conter apenas letras japonesas."
            )

        return value

    def validate_reading(self, value):
        pattern = r"^[ぁ-んァ-ン一-龯+/~ ]+$"

        if not re.match(pattern, value):
            raise serializers.ValidationError(
                "O campo 'reading' deve conter apenas letras japonesas."
            )

        return value

    def validate_meaning(self, value):
        pattern = r"^[a-zA-Z ]+$"

        if not re.match(pattern, value):
            raise serializers.ValidationError(
                "O campo 'meaning' deve conter apenas letras."
            )

        return value

    class Meta:
        model = Example
        fields = ["example", "reading", "meaning", "annotation"]


class ExampleSerializer(serializers.ModelSerializer):
    word = WordSerializer(read_only=True)

    class Meta:
        model = Example
        fields = [
            "id",
            "example",
            "reading",
            "meaning",
            "annotation",
            "word",
            "created_by",
            "created_at",
            "updated_at",
        ]


class TextCreateSerializer(serializers.ModelSerializer):
    def validate_title(self, value):
        pattern = r"^[ぁ-んァ-ン一-龯+/~ ]+$"

        if not re.match(pattern, value):
            raise serializers.ValidationError(
                "O campo 'title' deve conter apenas letras japonesas."
            )

        return value

    class Meta:
        model = Text
        fields = ["title", "text", "annotation"]


class TextSerializer(serializers.ModelSerializer):
    class Meta:
        model = Text
        fields = [
            "id",
            "title",
            "text",
            "annotation",
            "created_by",
            "created_at",
            "updated_at",
        ]


class TextTranslateCreateSerializer(serializers.ModelSerializer):
    def validate_title(self, value):
        pattern = r"^[a-zA-Z-~ ]+$"

        if not re.match(pattern, value):
            raise serializers.ValidationError(
                "O campo 'title' deve conter apenas letras."
            )

        return value

    class Meta:
        model = TextTranslate
        fields = ["title", "text", "text_original"]


class TextTranslateSerializer(serializers.ModelSerializer):
    text_original = TextSerializer(read_only=True)

    class Meta:
        model = TextTranslate
        fields = [
            "id",
            "title",
            "text",
            "text_original",
            "created_by",
            "created_at",
            "updated_at",
        ]


class TextWritingCreateSerializer(serializers.ModelSerializer):
    def validate_title(self, value):
        pattern = r"^[ぁ-んァ-ン一-龯+/~ ]+$"

        if not re.match(pattern, value):
            raise serializers.ValidationError(
                "O campo 'title' deve conter apenas letras japonesas."
            )

        return value

    class Meta:
        model = TextWriting
        fields = ["title", "text", "annotation"]


class TextWritingSerializer(serializers.ModelSerializer):
    class Meta:
        model = TextWriting
        fields = [
            "id",
            "title",
            "text",
            "annotation",
            "created_by",
            "created_at",
            "updated_at",
        ]
