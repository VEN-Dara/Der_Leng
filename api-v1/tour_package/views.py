from django.db.models import Avg, Count
from django.forms import ValidationError
from rest_framework import viewsets, filters, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import IsAuthenticated , IsAuthenticatedOrReadOnly
from rest_framework.pagination import PageNumberPagination

from django_filters.rest_framework import DjangoFilterBackend

from tour_package.models import *
from authentication.permissions import IsAdminOrStaffOrReadOnly, IsAdminOrStaffOrTourGuide, IsAdminOrStaffOrTourGuideOrReadOnly
from tour_package.serializers import *
from tour_package.mixins import *


from django.db import transaction

import json

class PackageViewSet(viewsets.ModelViewSet, PackageMixin):
    queryset = Package.objects.all()
    serializer_class = MediumPackageSerializer
    permission_classes = [IsAdminOrStaffOrTourGuideOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = '__all__'
    ordering_fields = ['created_at', 'avg_rating', 'amount_rating']
    search_fields = ["name", "description", "packageservice__detail", "packageschedule__destination", "address"]

    def get_queryset(self):
        queryset = super().get_queryset().filter(is_close=False)

        category_name = self.request.query_params.get('category_name')
        if category_name:
            queryset = queryset.filter(category__name=category_name)

        queryset = queryset.annotate(avg_rating=Avg('review__rating'), amount_rating=Count('review'))
        return queryset
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return PackageSerializer
        return super().get_serializer_class()

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        try:
            request_data = request.data.copy()
            request_data['user'] = request.user.id
            try:
                request_data['commission'] = PackageCommission.objects.get(type='normal').id
            except :
                PackageCommission.objects.create(type="normal", percentage_of_sale_price=0)
                request_data['commission'] = PackageCommission.objects.get(type='normal').id

            package_serializer = BasicPackageSerializer(data=request_data)
            package_serializer.is_valid(raise_exception=True)
            package_instance = package_serializer.save()

            images = request_data.getlist("images")
            if not images or len(images) == 0:
                raise ValidationError({"images": "package's images is required at least one and at most ten."})
            
            self.assign_image(package_instance=package_instance, images=images)

            services = json.loads(request_data.get("services", '{}'))
            if not services:
                raise ValidationError({"services": "package's services is rerequired at least one."})

            self.assign_service(package_instance=package_instance, services=services)

            schedules = json.loads(request_data.get("schedules", '{}'))
            if not schedules:
                raise ValidationError({"schedules": "package's schedules is rerequired at least one."})
            
            self.assign_schedule(package_instance=package_instance, schedules=schedules)

            unavailable_dates = json.loads(request_data.get("unavailable_dates", '{}'))
            self.assign_unavailable_date(package_instance=package_instance, unavailable_dates=unavailable_dates)  

            return Response(PackageSerializer(package_instance).data, status=status.HTTP_200_OK) 

        except Exception as error:
            transaction.set_rollback(True)
            return Response({"error": str(error)}, status=status.HTTP_400_BAD_REQUEST)
        
    @transaction.atomic
    def update(self, request, *args, **kwargs):
        try:
            request_data = request.data.copy()
            package_instance = self.get_object()
            request_data['user'] = request.user.id

            package_serializer = BasicPackageSerializer(instance=package_instance, data=request_data, partial=True)
            package_serializer.is_valid(raise_exception=True)
            package_instance = package_serializer.save()

            images = request_data.getlist("images")
            if images:
                self.assign_image(package_instance=package_instance, images=images)

            delete_images = json.loads(request_data.get("delete_images", '[]'))
            if delete_images:
                self.delete_image(delete_images=delete_images)

            if "services" in request_data:
                services = json.loads(request_data.get("services", '[]'))
                if not services:
                    raise ValidationError({"services": "package's services is rerequired at least one."})
                
                self.assign_service(package_instance=package_instance, services=services)

            if "schedules" in request_data:
                schedules = json.loads(request_data.get("schedules", '[]'))
                if not schedules:
                    raise ValidationError({"schedules": "package's schedules is rerequired at least one."})
                
                self.assign_schedule(package_instance=package_instance, schedules=schedules)
            
            if "unavailable_dates" in request_data:
                unavailable_dates = json.loads(request_data.get("unavailable_dates", '[]'))
                self.assign_unavailable_date(package_instance=package_instance, unavailable_dates=unavailable_dates)  

            return Response(PackageSerializer(package_instance).data, status=status.HTTP_200_OK) 

        except Exception as error:
            transaction.set_rollback(True)
            return Response({"error": str(error)}, status=status.HTTP_400_BAD_REQUEST)
        
    """
    Package is not allowed to delete to prevent from preblem that customer already booked but package turn to null. 
    Instead of delete package.is_close = True
    """
    def destroy(self, request, *args, **kwargs):
        try:
            delete_package = self.get_object()
            delete_package.is_close = True
            delete_package.save()
            return Response({"message": "Package closed successfully."}, status=status.HTTP_200_OK)
        except Exception as error:
            return Response({"error": str(error)}, status=status.HTTP_404_NOT_FOUND)
        
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = PackageCategory.objects.all()
    serializer_class = PackageCategorySerializer
    permission_classes = [IsAdminOrStaffOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = '__all__'

class ScheduleViewSet(viewsets.ModelViewSet):
    queryset = PackageSchedule.objects.all()
    serializer_class = PackageScheduleSerializer
    permission_classes = [IsAdminOrStaffOrTourGuideOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = '__all__'

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = PackageService.objects.all()
    serializer_class = PackageServiceSerializer
    permission_classes = [IsAdminOrStaffOrTourGuideOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = '__all__'

    """
    Service is not allowed to delete to prevent from preblem that customer already booked but Service turn to null. 
    Instead of delete Service.is_close = True
    """
    def destroy(self, request, *args, **kwargs):
        try:
            user: User = request.user
            delete_service: PackageService = self.get_object()

            #Validate Authorize if tour-guide is owner of service
            if(user.role.name == "tour_guide" and delete_service.package.user.id != user.id):
                raise PermissionDenied("You do not have permission to perform this action.")

            delete_service.is_close = True
            delete_service.save()
            return Response({"message": "Service closed successfully."}, status=status.HTTP_200_OK)
        except Exception as error:
            return Response({"error": str(error)}, status=status.HTTP_404_NOT_FOUND)

class FavoritePackageAPIView(APIView):
    permission_classes = [IsAuthenticated]

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
        
@api_view(['GET'])
def get_create_package_setup(request):
    try:
        # :: Get category ::
        categories = PackageCategory.objects.all()
        category_data = PackageCategorySerializer(categories, many=True).data

        # :: Get charge type ::
        charge_types = PackageChargeType.objects.all()
        charge_types_data = PackageChargeTypeSerializer(charge_types, many=True).data

        response = {
            "categories": category_data,
            "charge_types": charge_types_data
        }
        return Response(response, status=status.HTTP_200_OK)
    except Exception as error:
        return Response( {'error' : str(error)} , status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminOrStaffOrTourGuide])
def get_update_package_setup(request, pk):
    try:
        # :: Get category ::
        categories = PackageCategory.objects.all()
        category_data = PackageCategorySerializer(categories, many=True).data

        # :: Get charge type ::
        charge_types = PackageChargeType.objects.all()
        charge_types_data = PackageChargeTypeSerializer(charge_types, many=True).data

        # :: Get package info ::
        package = Package.objects.get(id=pk)
        package_data = BasicPackageSerializer(package).data

        response = {
            "categories": category_data,
            "charge_types": charge_types_data,
            "package_data": package_data
        }
        return Response(response, status=status.HTTP_200_OK)
    except Exception as error:
        return Response( {'error' : str(error)} , status=status.HTTP_400_BAD_REQUEST)
