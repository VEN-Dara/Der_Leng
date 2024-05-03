
import os

#===========================> Django Rest Framework OAuth2 <===========================
AUTHENTICATION_BACKENDS = (
    'social_core.backends.google.GoogleOAuth2',         # Google Token OAuth2
    'drf_social_oauth2.backends.DjangoOAuth2',          # drf-social-oauth2
    'django.contrib.auth.backends.ModelBackend',        # Django

    'drf_social_oauth2.backends.GoogleIdentityBackend', # Google JWT OAuth2
)

# Google configuration
SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = os.getenv('client_id')
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = os.getenv('client_secret')

# Define SOCIAL_AUTH_GOOGLE_OAUTH2_SCOPE to get extra permissions from Google.
SOCIAL_AUTH_GOOGLE_OAUTH2_SCOPE = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
]

# SOCIAL_AUTH_DJANGO_OAUTH2_REFRESH_TOKEN = True

OAUTH2_PROVIDER = {
    'ACCESS_TOKEN_EXPIRE_SECONDS': 36000,  # Set access token expiration to 1 hour.
    'REFRESH_TOKEN_EXPIRE_SECONDS': 1,  # Set refresh token expiration to 30 days.
    'ROTATE_REFRESH_TOKEN': True,
}