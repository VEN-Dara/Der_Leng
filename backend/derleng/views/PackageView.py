from django.forms import ValidationError
from rest_framework import viewsets, filters, status
from rest_framework.response import Response

from django_filters.rest_framework import DjangoFilterBackend

from derleng.models import Package, Category, Package_image
from authentication.permissions import Is_Admin_Or_Staff_Or_TourGuide_Or_ReadOnly
from derleng.serializers import BasicPackageSerializer, Package_scheduleSerializer, Package_serviceSerializer, Package_unavailable_dateSerializer, PackageSerializer, Package_imageSerializer
from derleng.mixins import PackageMixin


from django.db import transaction

import json

class PackageViewSet(viewsets.ModelViewSet, PackageMixin.PackageMixin):
    queryset = Package.objects.all()
    serializer_class = PackageSerializer
    permission_classes = [Is_Admin_Or_Staff_Or_TourGuide_Or_ReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = '__all__'
    search_fields = ["name", "description", "package_service__detail", "package_schedule__destination", "address"]

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        try:
            request_data = request.data.copy()
            request_data['user'] = request.user.id

            package_serializer = BasicPackageSerializer(data=request_data)
            package_serializer.is_valid(raise_exception=True)
            package_instance = package_serializer.save()

            images = request_data.getlist("images")
            if not images or len(images) > 6:
                raise ValidationError({"images": "package's images is rerequired at least one and at most six."})
            
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