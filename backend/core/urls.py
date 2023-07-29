from django.urls import path
from .views.grammar_views import grammar_list, grammar_detail
from .views.user_views import user_list, user_detail
from .views.profile_views import profile_list

urlpatterns = [
    path('grammar/', grammar_list, name="grammar_list_create"),
    path('grammar/<int:pk>/', grammar_detail, name="grammar_detail"),

    path('user/', user_list, name='user_list_create'),
    path('user/<int:pk>/', user_detail, name="user_detail"),

    path('profile/<int:user_id>/', profile_list, name="profile_list")
]
