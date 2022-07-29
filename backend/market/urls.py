from django.urls import path
from .views import UserCreate, UserRetrieveUpdateDestroy

urlpatterns = [
    path('user/', UserCreate.as_view(), name='user-create'),
    path('user/<slug:username>/', UserRetrieveUpdateDestroy.as_view(), name='user-rud')
]