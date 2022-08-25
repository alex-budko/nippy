import asyncio

from .models import Message, Stock, UserAccount
from .serializers import MessageSerializer, UserAccountSerializer, StockSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, SAFE_METHODS, BasePermission, IsAdminUser

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .stocks import stocks

from django.core.mail import send_mail
from rest_framework.decorators import api_view
from rest_framework.response import Response

import requests

import environ

env = environ.Env()
environ.Env.read_env()

@api_view(['POST'])
def add_stocks(req):
    print('adding stocks')
    stock_array = stocks[:40]
    for stock in stock_array:
        if not Stock.objects.filter(name=stock):
            Stock.objects.create(name=stock)
    
    return Response({'message': 'success'})  

# @api_view(['POST'])
# def update_stock_data():
#     all_stocks = Stock.objects.all()

#     stockNum = 1

#     for stock in all_stocks:
        
#         url1 = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&interval=5min&symbol=%s&apikey=%s' % (stock.name, 'F2831YU5EBL9X0I')

#         url2 = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=%s&apikey=%s' % (stock.name, 'F2831YU5EBL9X0I')

#         stockNum += 1

#         if stockNum > 5:
#             stockNum = 1
#             asyncio.sleep(60)

#         response1 = requests.get(url1)
        
#         stockNum += 1

#         if stockNum > 5:
#             stockNum = 1
#             asyncio.sleep(60)

#         response2 = requests.get(url2)

#         data = response1.json()
#         price_data = response2.json()

#         stock.data = data

#         print(stock.name)

#         if price_data["Global Quote"]:
#             stock.price = float(price_data["Global Quote"]["05. price"])
#             stock.save()
    
#     print('Done')
#     return Response({'message': 'success'})  

@api_view(['GET'])
def update_stock_data(req, pk, format=None):
    
    num = pk

    all_stocks = Stock.objects.all()

    url1 = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&interval=5min&symbol=%s&apikey=%s' % (all_stocks[num].name, 'F2831YU5EBL9X0I')

    url2 = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=%s&apikey=%s' % (all_stocks[num].name, 'F2831YU5EBL9X0I')
    response1 = requests.get(url1)
        
    response2 = requests.get(url2)
    data = response1.json()
    price_data = response2.json()
    all_stocks[num].data = data
    all_stocks[num].price = float(price_data["Global Quote"]["05. price"])
    all_stocks[num].save()

    url1 = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&interval=5min&symbol=%s&apikey=%s' % (all_stocks[num + 1].name, 'F2831YU5EBL9X0I')

    url2 = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=%s&apikey=%s' % (all_stocks[num + 1].name, 'F2831YU5EBL9X0I')
    response1 = requests.get(url1)
        
    response2 = requests.get(url2)
    data = response1.json()
    price_data = response2.json()
    all_stocks[num + 1].data = data
    all_stocks[num + 1].price = float(price_data["Global Quote"]["05. price"])
    all_stocks[num + 1].save()

    print('Done')

    return Response({'message': 'success'})  


@api_view(['POST'])
def contact_message(req):
    data = req.data
    send_mail(
        'Nippy Message from %s (%s)' % (data['name'], data['email']),
        data['message'],
        data['email'],
        ['alex.budko2017@gmail.com'],
        fail_silently=False,
    )
    return Response({'message': 'success'})

class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS

class UserRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    # permission_classes = [IsAuthenticated|ReadOnly]
    queryset = UserAccount.objects.all()
    serializer_class = UserAccountSerializer
    lookup_field='username'

class UserListCreate(generics.ListCreateAPIView):
    queryset = UserAccount.objects.all().order_by('-money')
    serializer_class = UserAccountSerializer

class StockList(generics.ListAPIView):
    queryset = Stock.objects.all().order_by('-price')
    serializer_class = StockSerializer

class StockCreate(generics.CreateAPIView):
    queryset = Stock.objects.all() 
    serializer_class = StockSerializer

class MessageList(generics.ListAPIView):
    queryset = Message.objects.all().order_by('-id')
    serializer_class = MessageSerializer

class MessageCreate(generics.CreateAPIView):
    queryset = Message.objects.all() 
    serializer_class = MessageSerializer

class MessageRetrieveDestroy(generics.RetrieveDestroyAPIView):
    queryset = Message.objects.all() 
    serializer_class = MessageSerializer
    lookup_field='id'

class StockRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    # permission_classes = [IsAuthenticated|ReadOnly]
    queryset = Stock.objects.all()
    serializer_class = StockSerializer
    lookup_field='name'

class ModdedTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Custom claims
        token['username'] = user.username
        token['email'] = user.email
        token['money'] = user.money
        token['stocks'] = user.stocks
        token['shorted_stocks'] = user.shorted_stocks

        return token

class ModdedTokenObtainPairView(TokenObtainPairView):
    serializer_class = ModdedTokenObtainPairSerializer

    
