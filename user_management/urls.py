from django.urls import path
from . import views

urlpatterns = [
    path('login_signup', views.loginsignup, name="login_signup"),
] 