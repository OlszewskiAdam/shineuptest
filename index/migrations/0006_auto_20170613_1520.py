# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('index', '0005_album'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='album',
            name='num_stars',
        ),
        migrations.RemoveField(
            model_name='album',
            name='release_date',
        ),
    ]
