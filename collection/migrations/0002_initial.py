# Generated by Django 5.0.6 on 2024-07-12 09:03

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models
def insert_default_genre(apps,scheme_editor):
    Genre = apps.get_model('collection', 'Genre')

    Genre.objects.bulk_create(
        [
            Genre(name="Comedy"),
            Genre(name="Crime and Mystery"),
            Genre(name="Drama"),
            Genre(name="Fantasy"),
            Genre(name="History"),                                
            Genre(name="Horror"),
            Genre(name="Nonfiction"),
            Genre(name="Persuasive"),
            Genre(name="Romance"),      
            Genre(name="Others"),
        ]
    )
def insert_default_type(apps,scheme_editor):
    Type = apps.get_model('collection', 'Type')

    Type.objects.bulk_create([
        Type(name="Blog"),
        Type(name="Book"),
        Type(name="Conference"),
        Type(name="Encyclopedia"),
        Type(name="Magazine"),                                
        Type(name="Newspaper"),
        Type(name="Others"),
        Type(name="Thesis"),
        Type(name="Website"),
    ]      
    )

class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('collection', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='collectiontitles',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='collections', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='entrytext',
            name='feature',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='collection.features'),
        ),
        migrations.AddField(
            model_name='collectiontitles',
            name='genre',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='collection.genre'),
        ),
        migrations.AddField(
            model_name='titleentry',
            name='text',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='collection.entryimage'),
        ),
        migrations.AddField(
            model_name='titleentry',
            name='title',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='collection.collectiontitles'),
        ),
        migrations.AddField(
            model_name='collectiontitles',
            name='type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='collection.type'),
        ),
        migrations.RunPython(insert_default_genre, migrations.RunPython.noop),
        migrations.RunPython(insert_default_type, migrations.RunPython.noop)
    ]
