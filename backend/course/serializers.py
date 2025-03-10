from rest_framework import serializers
from .models import *

class CourseSerializer(serializers.ModelSerializer):
      # Display instructor name

    class Meta:
        model = Course
        fields = ['id', 'title', 'price', 'thumbnail_url', ]

class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = '__all__'

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = '__all__'