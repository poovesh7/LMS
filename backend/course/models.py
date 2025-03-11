from django.db import models
from embed_video.fields import EmbedVideoField

class Course(models.Model):
    title = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    thumbnail_url = models.URLField(max_length=20000, blank=True, null=True)

    def __str__(self):
        return self.title

class Topic(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="topics", null=True, blank=True)  # Temporarily allow nulls
    title = models.CharField(max_length=255)
    description = models.TextField()
    video = EmbedVideoField(blank=True, null=True)

    def __str__(self):
        return self.title
class Quiz(models.Model):
    OPTION_CHOICES = [
        ('A', 'Option A'),
        ('B', 'Option B'),
        ('C', 'Option C'),
        ('D', 'Option D'),
    ]
    
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="quizzes", null=True, blank=True)
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name="quizzes")
    question = models.CharField(max_length=300)
    option_a = models.CharField(max_length=100)
    option_b = models.CharField(max_length=100)
    option_c = models.CharField(max_length=100)
    option_d = models.CharField(max_length=100)
    correct_option = models.CharField(max_length=1, choices=OPTION_CHOICES, default='A')

    def __str__(self):
        return f"Quiz for {self.topic.title} - Course: {self.course.title if self.course else 'No Course'}"
