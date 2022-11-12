# Generated by Django 3.2.16 on 2022-11-12 15:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('families', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Scrum',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('emoji', models.CharField(max_length=7, verbose_name='오늘의 기분')),
                ('yesterday', models.CharField(blank=True, max_length=25, null=True, verbose_name='어제 나는')),
                ('today', models.CharField(blank=True, max_length=25, null=True, verbose_name='오늘 나는')),
                ('created_at', models.DateField(auto_now_add=True)),
                ('family', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='scrum', to='families.family')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='scrum', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('content', models.CharField(max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('family', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comment', to='families.family')),
                ('scrum', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comment', to='scrums.scrum')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comment', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
