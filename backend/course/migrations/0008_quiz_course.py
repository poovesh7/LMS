# Generated by Django 5.1.6 on 2025-03-10 07:32

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0007_alter_course_thumbnail_url_alter_topic_course_quiz'),
    ]

    operations = [
        migrations.AddField(
            model_name='quiz',
            name='course',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='quizzes', to='course.course'),
        ),
    ]
