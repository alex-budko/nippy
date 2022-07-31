import email
import time

from platformdirs import user_config_dir
from .models import Stock, UserAccount
from .serializers import UserAccountSerializer, StockSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, SAFE_METHODS, BasePermission, IsAdminUser

import requests

import environ

env = environ.Env()
environ.Env.read_env()

# ["IBM", "AMZN", "TSLA", "ABBV", "ABEO", "GOOG", "ADBE", "ATVI", "EBAY", "EA", "INTC"]
def add_stocks(stock_array):
    for stock in stock_array:
        Stock.objects.create(name=stock)


def update_stock_data():
    all_stocks = Stock.objects.all()

    stockNum = 1

    for stock in all_stocks:
        
        url1 = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&interval=5min&symbol=%s&apikey=%s' % (stock.name, env('API_KEY'))

        url2 = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=%s&apikey=%s' % (stock.name, env('API_KEY'))

        stockNum += 1

        if stockNum > 5:
            stockNum = 1
            time.sleep(61)

        response1 = requests.get(url1)
        
        stockNum += 1

        if stockNum > 5:
            stockNum = 1
            time.sleep(61)

        response2 = requests.get(url2)

        data = response1.json()
        price_data = response2.json()

        stock.data = data

        print(stock.name)
        stock.price = float(price_data["Global Quote"]["05. price"])

        stock.save()
    
    print('Done')


class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS

class UserRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    # permission_classes = [IsAuthenticated|ReadOnly]
    queryset = UserAccount.objects.all()
    serializer_class = UserAccountSerializer
    lookup_field='username'

class UserListCreate(generics.ListCreateAPIView):
    queryset = UserAccount.objects.all()
    serializer_class = UserAccountSerializer

class StockList(generics.ListAPIView):

    queryset = Stock.objects.all().order_by('-price')
    serializer_class = StockSerializer

class StockCreate(generics.CreateAPIView):
    # permission_classes = [IsAdminUser|ReadOnly]
    queryset = Stock.objects.all() 
    serializer_class = StockSerializer

class StockRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    # permission_classes = [IsAuthenticated|ReadOnly]
    queryset = Stock.objects.all()
    serializer_class = StockSerializer
    lookup_field='name'


