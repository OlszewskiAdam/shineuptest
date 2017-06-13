# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('index', '0002_auto_20170613_1237'),
    ]

    operations = [
        migrations.RenameField(
            model_name='sectiontop',
            old_name='header',
            new_name='title',
        ),
    ]
