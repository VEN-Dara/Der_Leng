from django.urls import path
from booking.views import *

urlpatterns = [
    path('bookings', BookingPackageAPIView.as_view(), name='bookings'),
    path('accept_booking/<uuid:pk>', accept_booking, name="accept_booking"),
    path('booking_details', BookingDetailsAPIView.as_view(), name="booking_details"),
    path('carts', CartAPIView.as_view(), name='cart'),
    path('carts/<uuid:pk>', CartAPIView.as_view(), name='cart'),
    path('reviews' , ReviewAPIView.as_view(), name=''),
    path('reviews/<uuid:pk>' , ReviewAPIView.as_view(), name=''),
]