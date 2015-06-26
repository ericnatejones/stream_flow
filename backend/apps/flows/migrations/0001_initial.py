# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Account',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('username', models.CharField(unique=True, max_length=50)),
                ('password', models.CharField(max_length=3)),
            ],
        ),
        migrations.CreateModel(
            name='Parameter',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('upper_parameter', models.IntegerField()),
                ('lower_parameter', models.IntegerField()),
                ('account', models.ForeignKey(to='flows.Account')),
            ],
        ),
        migrations.CreateModel(
            name='Site',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('site', models.CharField(unique=True, max_length=8)),
                ('description', models.TextField(null=True, blank=True)),
                ('favorited_by', models.ManyToManyField(related_name='favorites', to='flows.Account', blank=True)),
            ],
        ),
        migrations.AddField(
            model_name='parameter',
            name='site',
            field=models.ForeignKey(to='flows.Site'),
        ),
    ]
