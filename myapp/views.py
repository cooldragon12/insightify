from django.shortcuts import render, HttpResponse, redirect
from django.contrib.auth import logout
from collection.models import CollectionTitles
from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet
from user_management.models import UserAccount
from .serializers import UserStatOverviewSerializer
 

def home(request):
    if request.user.is_authenticated:
        return redirect("dashboard")
    return render(request, "myapp/homepage.html", )

def dashboard(request):
    if not request.user.is_authenticated:
         return redirect('home')
    
    current_user = request.user
    context = { 
    'user' : current_user,
    }  
    return render(request, "myapp/dashboard.html", context)
 
def logout_view(request):
    logout(request)
    return redirect('home')

class UserStatOverviewViewSet(mixins.RetrieveModelMixin, mixins.ListModelMixin, GenericViewSet):
    queryset = UserAccount.objects.all()
    serializer_class = UserStatOverviewSerializer

    

    