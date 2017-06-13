# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('index', '0012_przyciskuslugi'),
    ]

    operations = [
        migrations.CreateModel(
            name='SekcjaConcierge',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, auto_created=True, verbose_name='ID')),
                ('naglowek_sekcji', models.CharField(max_length=20)),
                ('opis_sekcji', models.CharField(max_length=500)),
                ('tekst_przycisku', models.CharField(max_length=20, default='')),
            ],
        ),
    ]
