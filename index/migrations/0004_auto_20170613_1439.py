# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('index', '0003_auto_20170613_1240'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='sectiontop',
            name='created_date',
        ),
        migrations.RemoveField(
            model_name='sectiontop',
            name='published_date',
        ),
    ]
