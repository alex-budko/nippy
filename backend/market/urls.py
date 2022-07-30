from django.urls import path
from .views import StockCreate, StockRetrieveUpdateDestroy, UserCreate, UserList, UserRetrieveUpdateDestroy, StockList

urlpatterns = [
    path('user/', UserCreate.as_view(), name='user-create'),
    path('users/', UserList.as_view(), name='user-list'),
    path('user/<slug:username>/', UserRetrieveUpdateDestroy.as_view(), name='user-rud'),
    path('stock/', StockCreate.as_view(), name='stock-create'),
    path('stocks/', StockList.as_view(), name='stock-list'),
    path('stock/<slug:name>/', StockRetrieveUpdateDestroy.as_view(), name='stock-rud'),
]