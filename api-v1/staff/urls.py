from django.urls import include, path
from rest_framework.routers import DefaultRouter

from staff.views import TourGuideRegistrationViewSet, assign_tour_guide, get_dashboard, reject_tour_guide, remove_tour_guide

viewsetRouter = DefaultRouter()
viewsetRouter.register(r'staff/guide-registrations', TourGuideRegistrationViewSet, basename='tour-guide-registration')
urlpatterns = [
    path('', include(viewsetRouter.urls), name='viewset'),
    path('staff/dashboard', get_dashboard, name="get_dashboard"),
    path('staff/assign_tour_guide/<uuid:register_id>', assign_tour_guide, name="assign_tour_guide"),
    path('staff/reject_tour_guide/<uuid:register_id>', reject_tour_guide, name="reject_tour_guide"),
    path('staff/remove_tour_guide/<uuid:user_id>', remove_tour_guide, name="remove_tour_guide"),
]