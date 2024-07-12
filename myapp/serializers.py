from rest_framework import serializers
from user_management.models import UserAccount

class UserStatOverviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ('title_count', 'total_entries', 'total_test')

    