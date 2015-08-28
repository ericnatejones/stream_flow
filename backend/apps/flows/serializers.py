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


class NestedParameterSerializer(serializers.ModelSerializer):

    site = SiteSerializer()

    class Meta:
        model = Parameter


class NestedAccountsSerializer(serializers.ModelSerializer):

    sites = NestedParameterSerializer(source="parameters", many=True)

    class Meta:
        model = Account










