# Generated by Django 3.2.16 on 2022-11-04 14:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('schedule', '0002_schedule_important_mark'),
    ]

    operations = [
        migrations.AlterField(
            model_name='schedule',
            name='important_mark',
            field=models.BooleanField(default=False, null=True),
        ),
    ]
