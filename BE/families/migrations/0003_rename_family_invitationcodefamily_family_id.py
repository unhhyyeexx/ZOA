# Generated by Django 3.2.16 on 2022-11-10 23:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('families', '0002_auto_20221110_2330'),
    ]

    operations = [
        migrations.RenameField(
            model_name='invitationcodefamily',
            old_name='family',
            new_name='family_id',
        ),
    ]
