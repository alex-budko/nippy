from django.urls import path
from .views import MessageCreate, MessageRetrieveDestroy, MessageList, StockCreate, StockRetrieveUpdateDestroy, UserListCreate, UserRetrieveUpdateDestroy, StockList, contact_message, add_stocks, update_stock_data

urlpatterns = [
    path('users/', UserListCreate.as_view(), name='user-list-create'),
    path('users/<slug:username>/', UserRetrieveUpdateDestroy.as_view(), name='user-rud'),
    path('stock/', StockCreate.as_view(), name='stock-create'),
    path('stocks/', StockList.as_view(), name='stock-list'),
    path('stock/<slug:name>/', StockRetrieveUpdateDestroy.as_view(), name='stock-rud'),
    path('message/', MessageCreate.as_view(), name='message-create'),
    path('message/<slug:id>/', MessageRetrieveDestroy.as_view(), name='message-create'),
    path('messages/', MessageList.as_view(), name='message-list'),
    path('contact/', contact_message, name='contact-message'),
    path('add_stocks/', add_stocks),
    path('update_stock_data/', update_stock_data),
]