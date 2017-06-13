# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('index', '0011_auto_20170613_1556'),
    ]

    operations = [
        migrations.CreateModel(
            name='PrzyciskUslugi',
            fields=[
                ('id', models.AutoField(verbose_name='ID', auto_created=True, serialize=False, primary_key=True)),
                ('tekst_przycisku', models.CharField(max_length=20)),
            ],
        ),
    ]
