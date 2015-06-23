from django.db import models


class Account(models.Model):
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=3)

    def __str__(self):
        return self.username


class Site(models.Model):
    site = models.CharField(max_length=8, unique=True)
    description = models.TextField(blank=True, null=True)
    favorited_by = models.ManyToManyField(Account, related_name='favorites')

    def __str__(self):
        return self.description




