from rest_framework.serializers import ModelSerializer
from .models import UserFeedback


class UserFeedBackSerializer(ModelSerializer):
    class Meta:
        model = UserFeedback
        fields = (
            'user', 
            'rating', 
            'message', 
            'date_submitted', 
            'helpful_count', 
            'not_helpful_count'
            )

        