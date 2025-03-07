from rest_framework import serializers
from .models import Course

class CourseSerializer(serializers.ModelSerializer):
    instructor_username = serializers.CharField(source='instructor.username', read_only=True)  # Display instructor name

    class Meta:
        model = Course
        fields = ['id', 'title', 'price', 'thumbnail_url', 'instructor', 'instructor_username']
