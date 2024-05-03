from django.urls import include, path
from rest_framework.routers import DefaultRouter
from tour_package.views import *

viewsetRouter = DefaultRouter()
viewsetRouter.register(r'packages', PackageViewSet, basename='package')
viewsetRouter.register(r'categories', CategoryViewSet, basename='category')

urlpatterns = [
    path('', include(viewsetRouter.urls), name='viewset'),
    path('favorites/' , FavoritePackageAPIView.as_view(), name=''),
]