from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Stock
User = get_user_model()

class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'money', 'stocks')

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = "__all__"