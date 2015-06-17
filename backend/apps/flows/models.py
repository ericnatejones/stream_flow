from django.db import models


class Site(models.Model):
    site = models.CharField(max_length=8, unique=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.description




