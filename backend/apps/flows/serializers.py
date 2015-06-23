from rest_framework import serializers
from models import *


class SiteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Site


class AccountSerializer(serializers.ModelSerializer):

    class Meta:
        model = Account






