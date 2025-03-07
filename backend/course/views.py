from rest_framework import viewsets, permissions
from .models import Course
from .serializers import CourseSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]  # Only logged-in users can access

    def perform_create(self, serializer):
        """Automatically set the instructor field to the logged-in user."""
        serializer.save(instructor=self.request.user)
