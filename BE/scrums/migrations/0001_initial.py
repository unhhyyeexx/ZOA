# Generated by Django 3.2.16 on 2022-11-01 16:34

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('families', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Scrum',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('emoji', models.CharField(max_length=7, verbose_name='오늘의 기분')),
                ('yesterday', models.TextField(blank=True, null=True, verbose_name='어제 나는')),
                ('today', models.TextField(blank=True, null=True, verbose_name='오늘 나는')),
                ('created_at', models.DateField(auto_now_add=True)),
                ('family', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='scrum', to='families.family')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='scrum', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
