from django.db import models


class Account(models.Model):
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=3)

    def __unicode__(self):
        return unicode(self.username)


class Site(models.Model):
    site = models.CharField(max_length=8, unique=True)
    description = models.TextField(blank=True, null=True)
    favorited_by = models.ManyToManyField(Account, related_name='favorites', blank=True)

    def __unicode__(self):
        return unicode(self.description)


class Parameter(models.Model):
    site = models.ForeignKey(Site)
    account = models.ForeignKey(Account)
    upper_parameter = models.IntegerField()
    lower_parameter = models.IntegerField()

    def __unicode__(self):
        return unicode(self.site)














