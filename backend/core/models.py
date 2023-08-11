from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth import settings

# Create your models here.

class Grammar(models.Model):
    nivel_choices = (
        ('N5','N5'),
        ('N4','N4'),
        ('N3','N3'),
        ('N2','N2'),
        ('N1','N1'),
        ('UNKNOW','UNKNOW')
    )

    grammar = models.CharField(max_length=200)
    structure = models.CharField(max_length=200)
    level = models.CharField(max_length=6, choices=nivel_choices)
    explain = models.TextField(null=True, blank=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "grammars"
        ordering = ('id', )

    def __str__(self):
        return f'{self.grammar} - {self.level}'
    

class Profile(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    phone = models.CharField(null=True, blank=True, max_length=15)
    date_of_birth = models.DateField(null=True, blank=True)
    avatar = models.ImageField(default="profile.png", upload_to="uploads", null=True, blank=True)
    date_created = models.DateTimeField(auto_now_add = True, null=True, blank=True)


    def __str__(self):
        return self.user.first_name
    
class PracticeGrammar(models.Model):
    grammar = models.ForeignKey(Grammar, on_delete=models.SET_NULL, null=True, blank=True)
    first_sentence = models.CharField(max_length=250)
    second_sentence = models.CharField(max_length=250)
    third_sentence = models.CharField(max_length=250)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    class Meta:
        verbose_name = "practice grammar"
        verbose_name_plural = "practice grammars"
        ordering = ('id', )

    def __str__(self):
        return self.grammar.structure
    

class Sentence(models.Model):
    sentence = models.CharField(max_length=200, unique=True)
    translate = models.CharField(max_length=200)
    annotation = models.TextField(max_length=300, blank=True, null=True)
    grammar = models.ForeignKey(Grammar, on_delete=models.CASCADE, null=True, blank=True, related_name="Grammar_Phrase")
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, blank=True, null=True)
    

    class Meta:
        verbose_name = "sentence"
        verbose_name_plural = "sentences"
        ordering = ('translate', )

    def __str__(self):
        return self.sentence
    

class Category(models.Model):
    name = models.CharField(max_length=200, unique=True)
    is_created_by_user = models.BooleanField(default=False)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, blank=True, null=True)

    class Meta:
        verbose_name = "categopry"
        verbose_name_plural = "categories"
        ordering = ('name', )

    def __str__(self):
        return self.name