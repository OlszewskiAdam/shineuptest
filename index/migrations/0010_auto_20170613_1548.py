# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('index', '0009_auto_20170613_1547'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='sectiontop',
            name='author',
        ),
        migrations.DeleteModel(
            name='SectionTop',
        ),
    ]
