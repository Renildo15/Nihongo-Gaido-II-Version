from django.urls import path
from .views.grammar_views import grammar_list, grammar_detail

urlpatterns = [
    path('grammar/', grammar_list, name="grammar_list_create"),
    path('grammar/<int:pk>/', grammar_detail, name="grammar_detail")
]
