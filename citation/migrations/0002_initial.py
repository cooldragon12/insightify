# Generated by Django 5.0.6 on 2024-07-12 09:03

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('citation', '0001_initial'),
        ('collection', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='usercitation',
            name='genre',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='collection.genre'),
        ),
        migrations.AddField(
            model_name='usercitation',
            name='style',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='citation.style'),
        ),
        migrations.AddField(
            model_name='usercitation',
            name='title',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='collection.type'),
        ),
    ]
