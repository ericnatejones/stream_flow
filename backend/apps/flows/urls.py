from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf import settings
from rest_framework.authtoken.views import *
from views import *


urlpatterns = [

    url(r'^admin/', include(admin.site.urls)),
    url(r'^add-site/$', AddSite.as_view(), name='add-site'),
    url(r'^sites/$', SiteList.as_view(), name='site-list'),
    url(r'^get-user-info/', GetUserInfo.as_view()),
    url('^register-user/$', Registration.as_view(), name='registration'),
    url('^obtain-auth-token/', obtain_auth_token),
    url('^get-user-info/', GetUserInfo.as_view(), name='get-user-info'),
    url('^obtain-auth-token/', obtain_auth_token)

]
