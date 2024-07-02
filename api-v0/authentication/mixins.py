from oauth2_provider.models import AccessToken
from rest_framework_simplejwt.tokens import RefreshToken

from authentication.serializers import BasicUserSerializer
from backend.settings import SIMPLE_JWT
    
def get_jwt_by_token(access_token):
    try:
        token = AccessToken.objects.get(token=access_token)
        user = token.user
        if user:
            refresh = RefreshToken.for_user(user)
            access_token = refresh.access_token
            user_data = BasicUserSerializer(user).data
            return {
                'refresh_token': str(refresh),
                'refresh_token_exp': SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
                'access_token': str(access_token),
                'refresh_token_exp': SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
                'user': user_data,
            }
    except AccessToken.DoesNotExist:
        return {'error': 'Invalid access token'}
