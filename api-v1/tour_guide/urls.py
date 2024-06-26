from django.urls import include, path
from rest_framework.routers import DefaultRouter
from booking.views import accept_booking, reject_booking
from tour_guide.views import PackageViewSet, get_accept_booking, get_dashboard, get_reviews

viewsetRouter = DefaultRouter()
viewsetRouter.register(r'tour-guide/packages', PackageViewSet, basename='package')

urlpatterns = [
    path('', include(viewsetRouter.urls), name='viewset'),
    path('tour-guide/dashboard', get_dashboard, name="get_dashboard"),
    path('tour-guide/accept_booking/<uuid:pk>', accept_booking, name="accept_booking"),
    path('tour-guide/reject_booking/<uuid:pk>', reject_booking, name="reject_booking"),
    path('tour-guide/accept_booking/<str:type>', get_accept_booking, name="get_accept_booking"),
    path('tour-guide/reviews', get_reviews, name="get_reviews"),
]