from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class UserAccount(AbstractUser):
    first_name = None
    last_name = None
    date_of_birth = models.DateField()

    @property
    def title_count(self):
        return self.collections.count()
    @property
    def total_entries(self):
        total = 0
        for title in self.collections.all():
            # if isinstance(title.entries) is not None:
                total += title.entries_count
        return total
    
    @property
    def total_test(self):
        total = 0
        for title in self.collections.all():
            # if isinstance(title.tests) is not None:
                total += title.test_count
        return total

class UserFeedback(models.Model):
    user = models.ForeignKey(to=UserAccount, on_delete=models.CASCADE)
    rating = models.DecimalField(max_digits=2, decimal_places=1)
    message = models.CharField(max_length=1000)
    date_submitted = models.DateTimeField(auto_now_add=True)

    @property
    def helpful_count(self):
        return self.vote_count.filter(is_helpful=True).count()

    @property
    def not_helpful_count(self):
        return self.vote_count.filter(is_helpful=False).count()


class FeedbackVoteCount(models.Model):
    is_helpful = models.BooleanField()
    feedback = models.ForeignKey(to=UserFeedback, related_name="vote_count", on_delete=models.CASCADE)
    user = models.ForeignKey(to=UserAccount, on_delete=models.CASCADE)