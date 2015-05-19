from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from serializers import *
import json

class GetUserInfo(generics.RetrieveAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def retrieve(self, request, *args, **kwargs):
        user = UserSerializer(request.user)
        return HttpResponse(json.dumps(user.data))


class SiteList(generics.ListAPIView):
    serializer_class = SiteSerializer
    queryset = Site.objects.all()


class AddSite(generics.CreateAPIView):
    serializer_class = SiteSerializer

