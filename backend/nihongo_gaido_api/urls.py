
from django.contrib import admin
from django.urls import path
from nihongo_gaido_api.core import views

urlpatterns = [
    path('admin/', admin.site.urls),
     path('hello/', views.HelloView.as_view(), name='hello'),
]
