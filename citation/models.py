from django.db import models
from user_management.models import UserAccount
from collection.models import Genre, Type

class AuthorDetail(models.Model):
    first_name = models.CharField(max_length=30)
    middle_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    affiliation = models.CharField(max_length=1000)    

class Style(models.Model):
    name = models.CharField(max_length=20)

class UserCitation(models.Model):
    citation_text = models.TextField()
    user = models.ForeignKey(to=UserAccount,on_delete=models.CASCADE)
    authors = models.ManyToManyField(to=AuthorDetail)
    style = models.ForeignKey(to=Style,on_delete=models.CASCADE)
    title = models.ForeignKey(to=Type,on_delete=models.CASCADE)
    genre = models.ForeignKey(to=Genre,on_delete=models.CASCADE)