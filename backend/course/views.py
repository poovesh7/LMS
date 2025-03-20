from rest_framework import viewsets, status
from .models import Course
from .serializers import *

from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    

class TopicViewSet(viewsets.ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer

class QuizViewSet(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

class ProgressViewSet(viewsets.ViewSet):
 

    def retrieve(self, request, course_id=None):
        progress, created = Progress.objects.get_or_create(user=request.user, course_id=course_id)
        serializer = ProgressSerializer(progress)
        return Response(serializer.data)

    def update(self, request, course_id=None):
        progress, _ = Progress.objects.get_or_create(user=request.user, course_id=course_id)
        topic_id = request.data.get("topic_id")

        if topic_id:
            topic = Topic.objects.filter(id=topic_id, course_id=course_id).first()
            if topic:
                progress.completed_topics.add(topic)
                progress.update_progress()
                return Response({"message": "Progress updated", "progress": progress.progress_percentage}, status=status.HTTP_200_OK)
        
        return Response({"error": "Invalid topic or course"}, status=status.HTTP_400_BAD_REQUEST)