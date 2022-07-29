from .models import UserAccount
from .serializers import UserAccountSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, SAFE_METHODS, BasePermission, IsAdminUser

class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS

class UserCreate(generics.CreateAPIView):
    permission_classes = [IsAdminUser|ReadOnly]
    queryset = UserAccount.objects.all()
    serializer_class = UserAccountSerializer

class UserRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated|ReadOnly]
    queryset = UserAccount.objects.all()
    serializer_class = UserAccountSerializer
    lookup_field='username'