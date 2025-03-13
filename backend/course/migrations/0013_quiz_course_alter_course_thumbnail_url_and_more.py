# Generated by Django 5.1.6 on 2025-03-13 06:06

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0012_remove_progress_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='quiz',
            name='course',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='quizzes', to='course.course'),
        ),
        migrations.AlterField(
            model_name='course',
            name='thumbnail_url',
            field=models.URLField(blank=True, max_length=20000, null=True),
        ),
        migrations.DeleteModel(
            name='Progress',
        ),
    ]
