from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('thumbnails' , views.ThumbnailAPIView.as_view() , name=''),
    path('thumbnails/<uuid:pk>' , views.ThumbnailAPIView.as_view() , name=''),
    path('category' , views.CategoryAPIView.as_view(), name=''),
    path('category/<uuid:pk>' , views.CategoryAPIView.as_view(), name=''),
    path('reviewpost' , views.ReviewPostAPIView.as_view() , name='')
]