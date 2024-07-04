from django.urls import include, path


from . import views
from .views import NotificationViewSet, SetPasswordView, UserLogin, UserRegister, CurrentUserView, SocialLoginView, UserViewSet, is_username_exist, reset_password, verify_otp, generate_otp

from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

viewSetRouter = DefaultRouter()
viewSetRouter.register(r'users', UserViewSet, basename='users')
viewSetRouter.register(r'notifications', NotificationViewSet, basename='notifications')

urlpatterns = [
    # path('', views.index, name='index'),
    path('users/register', UserRegister.as_view(), name='user_register'),
    path('users/login', UserLogin.as_view(), name='user_login'),
    path('user', CurrentUserView.as_view(), name='user_detail'),
    path('user/set_password', SetPasswordView.as_view(), name='user_update_password'),
    path('user/reset_password', reset_password, name='reset_password'),
    path('user/is_username_exist/<str:username>', is_username_exist, name="is_username_exist"),
    path('', include(viewSetRouter.urls), name='viewset'),
    path('token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh_token', TokenRefreshView.as_view(), name='token_refresh'),
    path('social_login', SocialLoginView.as_view(), name ='social_login'),
    path('otp/generate/<str:username>', generate_otp, name="generate_otp"),
    path('otp/verify/<str:username>', verify_otp, name="verify_otp"),
]