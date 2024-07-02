from django.urls import include, path

from derleng.views import BookingView, Payment_methodView
from derleng.views.BookingDetailView import accept_booking, BookingDetailsAPIView
from derleng.views.FavoritePackageView import FavoritePackageAPIView

from .views import ThumbnailView, PackageView, ReviewView, CategoryView , CartView

from rest_framework.routers import DefaultRouter

from django.views.decorators.csrf import csrf_exempt


viewsetRouter = DefaultRouter()
viewsetRouter.register(r'packages', PackageView.PackageViewSet, basename='package')
viewsetRouter.register(r'categories', CategoryView.CategoryViewSet, basename='category')

urlpatterns = [
    path('', include(viewsetRouter.urls), name='viewset'),
    path('carts', CartView.CartAPIView.as_view(), name='cart'),
    path('carts/<uuid:pk>', CartView.CartAPIView.as_view(), name='cart'),
    path('thumbnails' , ThumbnailView.ThumbnailAPIView.as_view() , name=''),
    path('thumbnails/<uuid:pk>' , ThumbnailView.ThumbnailAPIView.as_view() , name=''),
    path('reviews' , ReviewView.ReviewAPIView.as_view(), name=''),
    path('reviews/<uuid:pk>' , ReviewView.ReviewAPIView.as_view(), name=''),
    path('favorites/' , FavoritePackageAPIView.as_view(), name=''),
    path('test-payment/', Payment_methodView.test_payment, name="test_payment"),
    path('test-payment_intent', Payment_methodView.test_payment_intent, name="test_payment"),
    path('payments', Payment_methodView.Payment_methodAPIView.as_view(), name='payment_method'),
    path('payments/<uuid:pk>', Payment_methodView.Payment_methodAPIView.as_view(), name='payment_method'),
    path('bookings', BookingView.BookingPackageAPIView.as_view(), name='bookings'),
    path('accept_booking/<uuid:pk>', accept_booking, name="accept_booking"),
    path('booking_details', BookingDetailsAPIView.as_view(), name="booking_details"),
    path('test-refund', Payment_methodView.create_refund, name="test_payment"),
]