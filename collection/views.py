from django.shortcuts import render, redirect
from django.http import JsonResponse
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status

from .models import CollectionTitles, Type, Genre
from .serializers import CollectionTitlesSerializer, TypeSerializer, GenreSerializer
# Create your views here.
 
def collections(request):
    """ To Show the collection of pages"""
    if not request.user.is_authenticated:
        return redirect('home')

    types = Type.objects.all()
    genres = Genre.objects.all()
    return render(request, 'collection/collections.html',{"genres" : genres, "types" : types})

class CollectionViewSet(ModelViewSet):
    queryset = CollectionTitles.objects.all()
    serializer_class = CollectionTitlesSerializer

    def get_queryset(self):
        return super().get_queryset().filter(user=self.request.user.id)
    

    def create(self, request, *args, **kwargs):
        data = request.data
        data._mutable = True
        data['user'] = request.user.id
        data._mutable = False
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)    

    
class TypeViewset(ModelViewSet):
    queryset = Type.objects.all()
    serializer_class = TypeSerializer

    def get_queryset(self):
        return super().get_queryset()
    
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)
    
class GenreViewset(ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer

    def get_queryset(self):
        return super().get_queryset()
