# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('index', '0014_auto_20170613_1633'),
    ]

    operations = [
        migrations.CreateModel(
            name='Kontakt',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('numer_telefonu', models.CharField(max_length=15)),
                ('adres_mail', models.EmailField(max_length=30)),
                ('adres', models.TextField(max_length=100)),
            ],
        ),
    ]
