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
    avatar = models.ImageField(default="profile.png", null=True, blank=True)
    date_created = models.DateTimeField(auto_now_add = True, null=True, blank=True)


    def __str__(self):
        return self.user.first_name