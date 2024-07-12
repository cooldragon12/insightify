from django.urls import path
from . import views

urlpatterns = [
    path('', views.collections, name="collections"),
    # path("Collection", views.getCollection, name="getCollection"),
    # path("addCollection", views.addCollection,name="addCollection")
]
