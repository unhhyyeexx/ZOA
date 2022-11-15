# Generated by Django 3.2.16 on 2022-11-14 20:51

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Photo',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('image', models.ImageField(blank=True, null=True, upload_to='checklist/photo/', verbose_name='체크리스트 사진')),
            ],
        ),
        migrations.CreateModel(
            name='Checklist',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('text', models.CharField(max_length=20, verbose_name='체크리스트 내용')),
                ('status', models.BooleanField(default=False, verbose_name='완료 여부')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('from_user_id', models.ForeignKey(db_column='from_user_id', on_delete=django.db.models.deletion.CASCADE, related_name='fromchecklist', to=settings.AUTH_USER_MODEL)),
                ('photo', models.ForeignKey(db_column='photo_id', null=True, on_delete=django.db.models.deletion.CASCADE, to='checklist.photo')),
                ('to_users_id', models.ForeignKey(db_column='to_user_id', on_delete=django.db.models.deletion.CASCADE, related_name='tochecklist', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
