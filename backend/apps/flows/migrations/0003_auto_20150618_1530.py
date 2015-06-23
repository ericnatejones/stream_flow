# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('flows', '0002_auto_20150618_1519'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='account',
            name='favorites',
        ),
        migrations.AddField(
            model_name='site',
            name='favorited_by',
            field=models.ManyToManyField(related_name='favorites', to='flows.Account'),
        ),
        migrations.DeleteModel(
            name='Favorite',
        ),
    ]
