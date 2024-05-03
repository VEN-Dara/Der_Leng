from django.urls import include, path


from . import views
from .views import SetPasswordView, UserLogin, UserRegister, CurrentUserView, SocialLoginView, UserViewSet

from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

viewSetRouter = DefaultRouter()
viewSetRouter.register(r'users', UserViewSet, basename='users')

urlpatterns = [
    # path('', views.index, name='index'),
    path('users/register', UserRegister.as_view(), name='user_register'),
    path('users/login', UserLogin.as_view(), name='user_login'),
    path('user', CurrentUserView.as_view(), name='user_detail'),
    path('user/set_password', SetPasswordView.as_view(), name='user_set_password'),
    path('', include(viewSetRouter.urls), name='viewset'),
    path('token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh_token', TokenRefreshView.as_view(), name='token_refresh'),
    path('social_login', SocialLoginView.as_view(), name ='social_login'),
]