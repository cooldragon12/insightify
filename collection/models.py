from django.db import models
from user_management.models import UserAccount

class Genre (models.Model):
    name = models.CharField(max_length=100)

class Type (models.Model):
    name = models.CharField(max_length=100)

class CollectionTitles(models.Model):
    user = models.ForeignKey(to=UserAccount,related_name="collections",on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    type = models.ForeignKey(to=Type,on_delete=models.CASCADE)
    genre = models.ForeignKey(to=Genre,on_delete=models.CASCADE)

    @property
    def entries_count(self):
        return self.entries.count()
    
    @property
    def test_count(self):
        return self.tests.count()

class Features(models.Model):
    chosen = models.CharField(max_length=20)

class EntryText(models.Model):
    feature = models.ForeignKey(to=Features,on_delete=models.CASCADE)
    text_scanned = models.TextField()
    text_generated = models.TextField()

class TitleEntry(models.Model):
    title = models.ForeignKey(to=CollectionTitles,related_name="entries",on_delete=models.CASCADE)
    entry_name = models.CharField(max_length=20)
    page = models.IntegerField()
    text = models.ForeignKey(to=EntryText,on_delete=models.CASCADE)
    text = models.ForeignKey(to="EntryImage",on_delete=models.CASCADE)

class EntryImage(models.Model):
    image = models.ImageField()
    name = models.CharField(max_length=40)
    height = models.IntegerField()
    width = models.IntegerField()
    date_taken = models.DateField(auto_now_add=True)