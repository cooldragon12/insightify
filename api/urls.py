from rest_framework.routers import DefaultRouter
from django.urls import path, include, reverse

from collection.views import CollectionViewSet, TypeViewset, GenreViewset
from myapp.views import UserStatOverviewViewSet

router = DefaultRouter()

router.register('collection', CollectionViewSet, 'collection')
router.register('type', TypeViewset,'type')
router.register('genre', GenreViewset,'genre')
router.register('userstat', UserStatOverviewViewSet, 'userstat')


urlpatterns = [
    path('', include(router.urls))
]
