# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('index', '0010_auto_20170613_1548'),
    ]

    operations = [
        migrations.AddField(
            model_name='gorastrony',
            name='tekst_przycisku',
            field=models.CharField(max_length=20, default=''),
        ),
        migrations.AlterField(
            model_name='gorastrony',
            name='opis_strony',
            field=models.TextField(max_length=300),
        ),
    ]
