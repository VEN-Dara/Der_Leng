from django.forms import ValidationError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status

from derleng.models import Package

class FavoritePackageAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            data = request.data.copy()
            package_id = data.get("package", None)
            if not package_id:
                raise ValidationError("package - Package id is required.")
            
            package = Package.objects.filter(pk=package_id)
            if not package:
                 raise ValidationError("Package does not exist.")
            
            package_obj = package.first()
            package_obj.favorites.add(request.user)

            return Response({"message" : "Package add to favorites list successfully."}, status=status.HTTP_200_OK)
        except Exception as error:
            return Response(error,  status=status.HTTP_400_BAD_REQUEST)
        
    def put(self, request):
        try:
            data = request.data.copy()
            package_id = data.get("package", None)
            if not package_id:
                raise ValidationError("package - Package id is required.")
            
            package = Package.objects.filter(pk=package_id)
            if not package:
                 raise ValidationError("Package does not exist.")
            
            package_obj = package.first()
            package_obj.favorites.remove(request.user)

            return Response({"message" : "Package removed from favorites list successfully."}, status=status.HTTP_200_OK)
        except Exception as error:
            return Response(error,  status=status.HTTP_400_BAD_REQUEST)
        
# >>> Package.first().favorites.all()
# >>> user.first().package_favorites.all()