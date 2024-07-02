from django.shortcuts import render
from django.http import HttpResponse
from django.core.exceptions import ObjectDoesNotExist, ValidationError
from django.contrib.auth import authenticate
from django.utils import timezone

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status, viewsets, filters
from rest_framework.permissions import IsAuthenticated

from django_filters.rest_framework import DjangoFilterBackend

from rest_framework_simplejwt.tokens import AccessToken, RefreshToken

from backend.settings import SIMPLE_JWT
from .validations import user_validation, is_valid_email, is_valid_username, validate_user_update
from .serializers import *
from .permissions import IsAdmin, IsAdminOrStaffOrReadOnly, IsStaff

from drf_social_oauth2.views import TokenView, ConvertTokenView
from .mixins import get_jwt_by_token

# Create your views here.
def index(request):
    return HttpResponse('Hello Dara, this is me.')

class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        try:
            validate_data = user_validation(request.data)
        except ValidationError as e:
            return Response({'errors': e}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = RegisterSerializer(data=validate_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(validate_data=validate_data)
            if user:
                return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Invalidate user data.'}, status=status.HTTP_400_BAD_REQUEST)

class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)

    def get_tokens_for_user(self, user):
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

    def login_user(self, request, username, password):
        user = authenticate(username=username, password=password)
        if user:
            user.last_login = timezone.now()
            user.save()
            return Response(self.get_tokens_for_user(user), status=status.HTTP_200_OK)
        else:
            return Response({'errors': 'Invalid password. Please double-check your password and try again.'}, status=status.HTTP_401_UNAUTHORIZED)

    def post(self, request):
        data = request.data
        print(data)
        username = data.get('username', '')
        password = data.get('password', '')

        if not username or not password:
            return Response({'errors': 'Username or password can not be none.'}, status=status.HTTP_400_BAD_REQUEST)
        
        if is_valid_username(username):
            return self.login_user(request, username, password)
        
        elif is_valid_email(username):
            find_users = User.objects.filter(email=username)

            if len(find_users) == 1:
                username = find_users[0].username
                return self.login_user(request, username, password)
            else:
                auth_users = []
                for user in find_users:
                    auth_user = authenticate(username=user.username, password=password)
                    if auth_user:
                        auth_user.last_login = timezone.now()
                        auth_user.save()
                        auth_users.append(auth_user)

                if not auth_users:
                    return Response({'errors': 'Invalid password. Please double-check your password and try again.'}, status=status.HTTP_401_UNAUTHORIZED)

                if len(auth_users) == 1:
                    username = auth_users[0].username
                    return self.login_user(request, username, password)

                responses = [self.get_tokens_for_user(user) for user in auth_users]
                return Response(responses, status=status.HTTP_202_ACCEPTED)
            
class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        return Response(UserSerializer(request.user).data, status=status.HTTP_200_OK)
    
    def put(self, request, format=None):
        user_update = request.user
        try:
            # updated_user = validate_user_update(user_update=user_update, request_data=request.data)
            serializer = UserSerializer(request.user, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ValidationError as errors:
            return Response({'error': errors}, status=status.HTTP_400_BAD_REQUEST)
        
class SetPasswordView(APIView):
    def post(self, request):
        serializer = SetPasswordSerializer(data=request.data)
        if serializer.is_valid():
            old_password = serializer.validated_data['old_password']
            password = serializer.validated_data['password']
            confirm_password = serializer.validated_data['confirm_password']
            user = request.user
            if not user.check_password(old_password):
                return Response({"message": "Old password is incorrect."}, status=status.HTTP_400_BAD_REQUEST)
            if password != confirm_password:
                return Response({"message": "Password and confirmation do not match."}, status=status.HTTP_400_BAD_REQUEST)
            user.set_password(password)
            user.save()
            return Response({"message": "Password has been updated successfully."}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SocialLoginView(ConvertTokenView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        response = super(SocialLoginView, self).post(request, *args, **kwargs)
        new_response_data = get_jwt_by_token(response.data.get('access_token', ''))
        # new_response = {}
        # if jwt_token.get('access', ''):
        #     new_response['access_token_jwt'] = jwt_token.get('access', '')
        # if jwt_token.get('refresh', ''):
        #     new_response['refresh_token_jwt'] = jwt_token.get('refresh', '')

        return Response(new_response_data, status=response.status_code)


"""
This ViewSet automatically provides `list`, `create`, `retrieve`,
`update` and `delete` actions.
"""
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminOrStaffOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['fullname', 'username', 'email']
    search_fields = ['fullname', 'username', 'email']


    def update(self, request, pk=None):
        try:
            user_update = User.objects.get(pk=pk)

            try:
                """
                Update role user if role_id given
                """
                if 'role_id' in request.data:
                    role_id = request.data['role_id']
                    new_role = User_role.objects.filter(pk=role_id).first()

                    if not new_role:
                        raise ObjectDoesNotExist
                    
                    if IsStaff and (new_role.name == "admin" or new_role.name == "staff"):
                        return Response({"error": "You do not have permission to assign role as admin or staff."}, status=status.HTTP_403_FORBIDDEN)
                        
                    user_update.role = new_role

                serializer = UserSerializer(instance=user_update, data=request.data, partial=True)
                serializer.is_valid(raise_exception=True)
                updated_user = serializer.save()
                return Response(UserSerializer(updated_user).data, status=status.HTTP_200_OK)
            
            except ValidationError as error:
                return Response({"error": str(error)}, status=status.HTTP_404_NOT_FOUND)

        except ObjectDoesNotExist as error:
            return Response({"error": str(error)}, status=status.HTTP_404_NOT_FOUND)

