from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import CollectionTitles, Type, Genre


class CollectionTitlesSerializer(ModelSerializer):
    type_name = serializers.ReadOnlyField(source='type.name')
    genre_name = serializers.ReadOnlyField(source='genre.name')
    class Meta:
        model = CollectionTitles
        fields = ('title', 'author', 'type', 'genre','user', 'type_name', 'genre_name')

class TypeSerializer(ModelSerializer):
   
    class Meta:
        model = Type
        fields = ('__all__')

class GenreSerializer(ModelSerializer):
    class Meta:
        model = Genre
        fields = ('__all__')

