from .models import UserAccount
from .serializers import UserAccountSerializer
from rest_framework import generics

class UserCreate(generics.CreateAPIView):
    queryset = UserAccount.objects.all()
    serializer_class = UserAccountSerializer
