from rest_framework import generics
from serializers import *
from django.http import HttpResponse


# class Everything(generics.ListCreateAPIView):
#     # serializer_class = EverythingSerializer
#     parameters = Parameter.objects.values('site', 'account', 'lower_parameter', 'upper_parameter')
#     sites = Site.objects.all().values('favorited_by', 'description', 'site', 'id')
#     accounts = Account.objects.values()
#     accounts_dictionary = dict()
#     print accounts
#     print sites
#     print parameters
#     for account in accounts:
#         accounts_dictionary[str(account['username'])] = []
#
#     for account in accounts:
#         accounts_dictionary[account['username']].append(account[u'id'])
#
#     print accounts_dictionary
#
#     for site in sites:
#         for account in accounts_dictionary:
#             if accounts_dictionary[account][0] is site['favorited_by']:
#                 accounts_dictionary[account].append({str(site['description']): (site['id'])})
#
#     print accounts_dictionary
#
#     for account in accounts_dictionary:
#         if len(accounts_dictionary[account]) > 1:
#             for river_dict in accounts_dictionary[account]:
#                 for parameter in parameters:
#                     if parameter['account'] is accounts_dictionary[account][0]:
#                         if type(river_dict) is dict:
#                             if river_dict[river_dict.keys()[0]] is parameter['site']:
#                                 river_dict[river_dict.keys()[0]] = [parameter['lower_parameter'],
#                                                                     parameter['upper_parameter']]
#
#     print accounts_dictionary
#
#     for account in accounts_dictionary:
#         del accounts_dictionary[account][0]
#         for river_dict in accounts_dictionary[account]:
#             if type(river_dict[river_dict.keys()[0]]) is int:
#                 river_dict[river_dict.keys()[0]] = []
#
#     print accounts_dictionary
#
#     json_accounts_dictionary = str([accounts_dictionary]).replace("'", '"')
#
#     print json_accounts_dictionary
#
#     queryset = accounts_dictionary

# return HttpResponse(your_string, content_type='application/json')

class Everything(generics.ListAPIView):
    serializer_class = NestedAccountsSerializer
    queryset = Account.objects.all()


class SiteList(generics.ListAPIView):
    serializer_class = SiteSerializer
    queryset = Site.objects.all()


class SiteUpdate(generics.RetrieveUpdateDestroyAPIView):
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


class ParameterList(generics.ListCreateAPIView):
    parameter = Parameter.objects.all()
    queryset = Parameter.objects.all()
    serializer_class = ParameterSerializer
