from rest_framework import generics
from serializers import *


class SiteList(generics.ListAPIView):
    serializer_class = SiteSerializer
    queryset = Site.objects.all()


class AccountList(generics.ListAPIView):
    accounts = Account.objects.all()
    serializer_class = AccountSerializer
    queryset = Account.objects.all()


class AddSite(generics.CreateAPIView):
    serializer_class = SiteSerializer


class AddAccount(generics.CreateAPIView):
    accounts = Account.objects.all()
    serializer_class = AccountSerializer