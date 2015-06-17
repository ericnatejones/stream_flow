
from rest_framework import generics

from serializers import *





class SiteList(generics.ListAPIView):
    serializer_class = SiteSerializer
    queryset = Site.objects.all()


class AddSite(generics.CreateAPIView):
    serializer_class = SiteSerializer

