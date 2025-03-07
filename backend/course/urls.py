from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CourseViewSet

# Using DRF's DefaultRouter to generate routes automatically
router = DefaultRouter()
router.register(r'courses', CourseViewSet, basename='course')

urlpatterns = [
    path('api/', include(router.urls)),  # Include the generated API routes
]
