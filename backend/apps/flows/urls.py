from django.conf.urls import url

from views import *


urlpatterns = [

    url(r'^add-site/$', AddSite.as_view(), name='add-site'),
    url(r'^sites/$', SiteList.as_view(), name='site-list'),

]
