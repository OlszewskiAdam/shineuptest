# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('index', '0013_sekcjaconcierge'),
    ]

    operations = [
        migrations.CreateModel(
            name='BelkaRealizacje',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, verbose_name='ID', auto_created=True)),
                ('naglowek', models.CharField(max_length=20)),
                ('opis', models.TextField(max_length=500)),
            ],
        ),
        migrations.AlterField(
            model_name='sekcjaconcierge',
            name='opis_sekcji',
            field=models.TextField(max_length=500),
        ),
    ]
