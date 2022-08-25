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


@api_view(['POST'])
def update_stock_data(req):
    all_stocks = Stock.objects.all()

    for stock in all_stocks:
        if stockNum == 2:
            break

        if stock.price == 0.0:

            url1 = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&interval=5min&symbol=%s&apikey=%s' % (
                stock.name, 'F2831YU5EBL9X0I')

            url2 = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=%s&apikey=%s' % (
                stock.name, 'F2831YU5EBL9X0I')

            stockNum += 1

            response1 = requests.get(url1)

            response2 = requests.get(url2)

            data = response1.json()
            price_data = response2.json()

            stock.data = data

            stock.price = float(price_data["Global Quote"]["05. price"])
            stock.save()

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
    lookup_field = 'username'


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
    lookup_field = 'id'


class StockRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    # permission_classes = [IsAuthenticated|ReadOnly]
    queryset = Stock.objects.all()
    serializer_class = StockSerializer
    lookup_field = 'name'


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
