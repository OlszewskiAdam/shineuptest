# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('index', '0008_auto_20170613_1531'),
    ]

    operations = [
        migrations.CreateModel(
            name='GoraStrony',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, verbose_name='ID', auto_created=True)),
                ('naglowek_strony', models.CharField(max_length=20)),
                ('opis_strony', models.TextField(max_length=200)),
            ],
        ),
        migrations.AlterField(
            model_name='uslugi',
            name='nazwa_uslugi',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='uslugi',
            name='opis_uslugi',
            field=models.TextField(max_length=200),
        ),
    ]
