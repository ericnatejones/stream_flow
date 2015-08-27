from django.db import models


class Account(models.Model):
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=3)

    def __unicode__(self):
        return unicode(self.username)


class Site(models.Model):
    site = models.CharField(max_length=8, unique=True)
    description = models.TextField(blank=True, null=True)
    favorited_by = models.ManyToManyField(Account, related_name='favorites', blank=True, through="Parameter")

    def __unicode__(self):
        return unicode(self.description)


class Parameter(models.Model):
    site = models.ForeignKey(Site, related_name="parameters")
    account = models.ForeignKey(Account, related_name="parameters")
    lower_parameter = models.IntegerField()
    upper_parameter = models.IntegerField()

    def __unicode__(self):
        return unicode(self.site) + ", " + \
            unicode(self.account) + ", " + \
            unicode(self.lower_parameter) + " - " + \
            unicode(self.upper_parameter)














