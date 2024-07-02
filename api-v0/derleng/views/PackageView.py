from django.db.models import Q, Avg, Count
from django.forms import ValidationError
from rest_framework import viewsets, filters, status
from rest_framework.response import Response

from django_filters.rest_framework import DjangoFilterBackend

from derleng.models import Commission, Package, Category, Package_image
from authentication.permissions import IsAdminOrStaffOrTourGuideOrReadOnly
from derleng.serializers import BasicPackageSerializer, MediumPackageSerializer, Package_scheduleSerializer, Package_serviceSerializer, Package_unavailable_dateSerializer, PackageSerializer, Package_imageSerializer
from derleng.mixins import PackageMixin


from django.db import transaction

import json

class PackageViewSet(viewsets.ModelViewSet, PackageMixin.PackageMixin):
    queryset = Package.objects.all()
    serializer_class = MediumPackageSerializer
    permission_classes = [IsAdminOrStaffOrTourGuideOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = '__all__'
    ordering_fields = ['created_at', 'avg_rating', 'amount_rating']
    search_fields = ["name", "description", "package_service__detail", "package_schedule__destination", "address"]

    def get_queryset(self):
        queryset = super().get_queryset()

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
            request_data['commission'] = Commission.objects.get(type='normal').id

            package_serializer = BasicPackageSerializer(data=request_data)
            package_serializer.is_valid(raise_exception=True)
            package_instance = package_serializer.save()

            thumbnail = request_data.get("thumbnail", '')
            if not thumbnail:
                raise ValidationError({"thumbnail": "Thumbnail image is required."})
            self.assign_cover_image(package_instance, thumbnail, "thumbnail")
            
            cover = request_data.get("cover", '')
            if not cover:
                raise ValidationError({"cover": "Cover image is required."})
            self.assign_cover_image(package_instance, cover, "cover")

            images = request_data.getlist("images")
            if not images or len(images) > 6:
                raise ValidationError({"images": "package's images is required at least one and at most six."})
            
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

            thumbnail = request_data.get("thumbnail", '')
            if thumbnail:
                self.assign_cover_image(package_instance, thumbnail, "thumbnail")

            cover = request_data.get("cover", '')
            if cover:
                self.assign_cover_image(package_instance, cover, "cover")

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