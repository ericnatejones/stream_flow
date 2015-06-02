from rest_framework import serializers
from models import *
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        user = User(username=validated_data['username'])
        user.set_password(validated_data['password'])
        user.save()
        return user


    class Meta:
        model = User
        fields = ('id', 'username', 'password')


class SiteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Site






