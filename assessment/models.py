from django.db import models
from collection.models import CollectionTitles
from user_management.models import UserAccount

class Test(models.Model):
    collection = models.ForeignKey(to=CollectionTitles,related_name="tests",on_delete=models.CASCADE)
    name = models.CharField(max_length=40)
    date_created = models.DateField(auto_now_add=True)
    last_modified = models.DateField(auto_now_add=True)

class AnswerSet(models.Model):
    test = models.ForeignKey(to=Test,on_delete=models.CASCADE)
    answer = models.TextField()

class QuestionSet(models.Model):
    test = models.ForeignKey(to=Test,on_delete=models.CASCADE)
    question = models.TextField()

class TestTaken(models.Model):
    user = models.ForeignKey(to=UserAccount,on_delete=models.CASCADE)
    score = models.IntegerField()