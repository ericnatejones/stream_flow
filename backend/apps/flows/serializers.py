from rest_framework import serializers
from models import *
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'username', 'email')


class SiteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Site






