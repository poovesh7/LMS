from django.db import models
from learn.models import User  # Import the User model

class Course(models.Model):
    title = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    thumbnail_url = models.URLField(max_length=5000, blank=True, null=True)  # Change to URLField
    instructor = models.ForeignKey(User, on_delete=models.CASCADE, related_name="courses")  # Link to User model

    def __str__(self):
        return f"{self.title} - {self.instructor.username}"
