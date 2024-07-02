from django.urls import path
from telegrambot import views

urlpatterns = [
    path('webhook/', views.webhook, name='webhook'),
]
