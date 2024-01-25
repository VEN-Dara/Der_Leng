from django.urls import include, path

from derleng.views import Payment_methodView

from .views import ThumbnailView, PackageView, ReviewView, CategoryView , CartView

from rest_framework.routers import DefaultRouter

from django.views.decorators.csrf import csrf_exempt


viewsetRouter = DefaultRouter()
viewsetRouter.register(r'packages', PackageView.PackageViewSet, basename='package')

urlpatterns = [
    path('', include(viewsetRouter.urls), name='viewset'),
    path('carts', CartView.CartAPIView.as_view(), name='cart'),
    path('carts/<uuid:pk>', CartView.CartAPIView.as_view(), name='cart'),
    path('thumbnails' , ThumbnailView.ThumbnailAPIView.as_view() , name=''),
    path('thumbnails/<uuid:pk>' , ThumbnailView.ThumbnailAPIView.as_view() , name=''),
    path('categorys' , CategoryView.CategoryAPIView.as_view(), name=''),
    path('categorys/<uuid:pk>' , CategoryView.CategoryAPIView.as_view(), name=''),
    path('reviews' , ReviewView.ReviewAPIView.as_view(), name=''),
    path('reviews/<uuid:pk>' , ReviewView.ReviewAPIView.as_view(), name=''),
    path('test-payment/', Payment_methodView.test_payment, name="test_payment"),
    path('test-payment_intent', Payment_methodView.test_payment_intent, name="test_payment"),
    path('payments', Payment_methodView.Payment_methodAPIView.as_view(), name='payment_method'),
]