# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('index', '0007_auto_20170613_1521'),
    ]

    operations = [
        migrations.RenameField(
            model_name='uslugi',
            old_name='name',
            new_name='nazwa_uslugi',
        ),
        migrations.RenameField(
            model_name='uslugi',
            old_name='text',
            new_name='opis_uslugi',
        ),
    ]
