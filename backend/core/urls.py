from django.urls import path
from .views.grammar_views import grammar_list

urlpatterns = [
    path('grammar/', grammar_list, name="grammar_list_create")
]
