from django.urls import path
from .views import *

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('user/', UserDetailView.as_view(), name='get_user'),
    path('admin/user-counts/', UserCountsView.as_view(), name='user-counts'),
    path('admin/users/', UserListView.as_view(), name='user-list'),
    path('admin/user/<int:pk>/', UserDetailView.as_view(), name='user-detail'),  # Fix duplicate issue
    path('admin/users/<int:pk>/update/', UserUpdateView.as_view(), name='user-update'),  # Unique path
    path('admin/users/<int:pk>/delete/', UserDeleteView.as_view(), name='user-delete'),  # Unique path
]
