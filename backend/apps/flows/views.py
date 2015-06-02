from rest_framework import generics, response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from serializers import *


class GetUserInfo(generics.RetrieveAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = request.user
        serializer = self.get_serializer(instance)
        return response.Response(serializer.data)

class UserRegistration(generics.CreateAPIView):
    serializer_class = UserSerializer

class Registration(generics.CreateAPIView):
    serializer_class = UserSerializer


class SiteList(generics.ListAPIView):
    serializer_class = SiteSerializer
    queryset = Site.objects.all()


class AddSite(generics.CreateAPIView):
    serializer_class = SiteSerializer



