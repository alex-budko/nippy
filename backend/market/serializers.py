from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Stock, Message
User = get_user_model()


class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'money', 'shorted_money', 'shorted_stocks', 'stocks')


class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = "__all__"


class MessageSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(
        slug_field="username", many=False,
        queryset=User.objects.all(),
    )

    class Meta:
        model = Message
        fields = "__all__"
