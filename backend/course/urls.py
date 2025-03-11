from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

# Using DRF's DefaultRouter to generate routes automatically
router = DefaultRouter()
router.register(r'courses', CourseViewSet, basename='course')
router.register(r'topics', TopicViewSet,basename='topic')
router.register(r'quizzes', QuizViewSet, basename='quiz')

urlpatterns = [
    path('', include(router.urls)),  # Removed 'api/' to avoid duplication
]
