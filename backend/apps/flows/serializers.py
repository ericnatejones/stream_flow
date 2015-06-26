from rest_framework import serializers
from models import *


class SiteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Site


class AccountSerializer(serializers.ModelSerializer):

    class Meta:
        model = Account


class ParameterSerializer(serializers.ModelSerializer):

    class Meta:
        model = Parameter






