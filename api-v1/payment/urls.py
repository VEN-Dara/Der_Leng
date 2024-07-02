from django.urls import path
from payment.views import *

urlpatterns = [
    path('payments', PaymentMethodAPIView.as_view(), name='payment_method'),
    path('payments/<uuid:pk>', PaymentMethodAPIView.as_view(), name='payment_method'),
    path('payments/refund', create_refund, name='create_refund'),
]