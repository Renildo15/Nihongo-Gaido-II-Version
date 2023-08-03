from django.urls import path
from .views.grammar_views import grammar_list, grammar_detail
from .views.user_views import user_list, user_detail
from .views.profile_views import profile_list
from .views.practice_grammar_views import choice_grammar, choice_grammar_detail, setence_list
from .views.sentence_views import sentence_list, sentence_detail

urlpatterns = [
    path('grammar/', grammar_list, name="grammar_list_create"),
    path('grammar/<int:pk>/', grammar_detail, name="grammar_detail"),

    path('user/', user_list, name='user_list_create'),
    path('user/<int:pk>/', user_detail, name="user_detail"),

    path('profile/<int:user_id>/', profile_list, name="profile_list"),
    
    path('choice_grammar/', choice_grammar, name="choice_grammar"),
    path('choice_grammar/<int:pk>/', choice_grammar_detail, name="choice_grammar_detail"),
    path('sentence_list/', setence_list, name="sentence_list"),

    path('sentence/', sentence_list, name="sentence_list_create"),
    path('sentence/<int:pk>/', sentence_detail, name="sentence_detail"),
]
