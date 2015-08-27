from django.conf.urls import include, url
from django.contrib import admin
from rest_framework.authtoken import views
from views import *


urlpatterns = [

    url(r'^add-site/$', AddSite.as_view(), name='add-site'),
    url(r'^sites/$', SiteList.as_view(), name='site-list'),
    url(r'^update-site/(?P<pk>[0-9]+)$', SiteUpdate.as_view(), name='site-update'),
    url(r'^add-account/$', AddAccount.as_view(), name='add-account'),
    url(r'^accounts/$', AccountList.as_view(), name='account-list'),
    url(r'^parameters/$', ParameterList.as_view(), name='parameter-list'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^everything/', Everything.as_view(), name='everything-list')

]
