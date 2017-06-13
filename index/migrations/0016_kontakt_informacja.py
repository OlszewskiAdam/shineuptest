# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('index', '0015_kontakt'),
    ]

    operations = [
        migrations.AddField(
            model_name='kontakt',
            name='informacja',
            field=models.TextField(max_length=500, default=''),
        ),
    ]
