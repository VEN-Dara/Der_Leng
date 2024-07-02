from django.urls import include, path
from rest_framework.routers import DefaultRouter
from tour_package.views import *

viewsetRouter = DefaultRouter()
viewsetRouter.register(r'packages', PackageViewSet, basename='package')
viewsetRouter.register(r'categories', CategoryViewSet, basename='category')
viewsetRouter.register(r'package-services', ServiceViewSet, basename='services')
viewsetRouter.register(r'package-schedules', ScheduleViewSet, basename='schedules')

urlpatterns = [
    path('', include(viewsetRouter.urls), name='viewset'),
    path('favorites/' , FavoritePackageAPIView.as_view(), name=''),
    path('packages/create/setup', get_create_package_setup, name='get_create_package_setup'),
    path('packages/<uuid:pk>/update/setup', get_update_package_setup, name='get_update_package_setup'),
]