from django.forms import ValidationError
from core.settings.base import MEDIA_URL
from tour_package.models import *
from tour_package.serializers import *

class PackageMixin:
    def assign_service(self, package_instance, services):
        for service_data in services:
            service_data['package'] = package_instance.id # Can not be an instance because no read_only in serializer that fk
            package_service_serializer = PackageServiceSerializer(data=service_data)
            package_service_serializer.is_valid(raise_exception=True)
            package_service_serializer.save()

    def delete_image(self, delete_images):
        for delete_image in delete_images:
            PackageImage.objects.filter(pk=delete_image.get("id")).delete()

    def assign_cover_image(self, package_instance, cover, type):
        image_data = {}
        image_data["image"] = cover
        image_data["type"] = type
        image_data['package'] = package_instance.id
        package_image_serializer = PackageImageSerializer(data=image_data)
        package_image_serializer.is_valid(raise_exception=True)
        package_image_serializer.save()
        
    def assign_image(self, package_instance, images):
        package_image_number = PackageImage.objects.filter(package=package_instance).count()
        package_image_number_can_input = 6 - package_image_number
        if package_image_number_can_input == 0:
            raise ValidationError({f"images": "package's images already existed at maximum number for one package."})
        # if package_image_number_can_input < 0:
        #     raise ValidationError({f"images": "package's images can input only {package_image_number_can_input} more."})

        for image in images:
            image_data = {}
            image_data["image"] = image
            image_data['package'] = package_instance.id # Can not be an instance because no read_only in serializer that fk
            package_image_serializer = PackageImageSerializer(data=image_data)
            package_image_serializer.is_valid(raise_exception=True)
            package_image_serializer.save()
            
    def assign_service(self, package_instance, services):
        existing_service_ids = set(service["id"] for service in services if service.get("id"))

        # Close service if service not exist when update
        # for existed_service in package_instance.packageservice_set.all():
        #     if existed_service.id not in existing_service_ids:
        #         existed_service.is_close = True
        #         existed_service.save()

        for service_data in services:
            service_instance = PackageService.objects.filter(id=service_data.get("id")).first()
            service_data['package'] = package_instance.id # Can not be an instance because no read_only in serializer that fk
            service_data['price'] = service_data["price"] * 100 # Convert dollar to cent
            package_service_serializer = PackageServiceSerializer(instance=service_instance, data=service_data, partial=True)
            package_service_serializer.is_valid(raise_exception=True)
            package_service_serializer.save()

    def assign_schedule(self, package_instance, schedules):
        existing_schedule_ids = set(schedule["id"] for schedule in schedules if schedule.get("id"))

        # Close schedule if schedule not exist when update
        for existed_schedule in package_instance.packageschedule_set.all():
            if existed_schedule.id not in existing_schedule_ids:
                existed_schedule.is_close = True
                existed_schedule.save()

        for schedule_data in schedules:
            schedule_instance = PackageSchedule.objects.filter(id=schedule_data.get("id")).first()
            schedule_data['package'] = package_instance.id # Can not be an instance because no read_only in serializer that fk
            package_schedule_serializer = PackageScheduleSerializer(instance=schedule_instance, data=schedule_data, partial=True)
            package_schedule_serializer.is_valid(raise_exception=True)
            package_schedule_serializer.save()

    def assign_unavailable_date(self, package_instance, unavailable_dates):
        existing_unavailable_date_ids = set(unavailable_date["id"] for unavailable_date in unavailable_dates if unavailable_date.get("id"))

        # Close unavailable_date if unavailable_date not exist when update
        for existed_unavailable_date in package_instance.packageunavailabledate_set.all():
            if existed_unavailable_date.id not in existing_unavailable_date_ids:
                existed_unavailable_date.is_close = True
                existed_unavailable_date.save()

        for unavailable_date_data in unavailable_dates:
            unavailable_date_instance = PackageUnavailableDate.objects.filter(id=unavailable_date_data.get("id")).first()
            unavailable_date_data['package'] = package_instance.id # Can not be an instance because no read_only in serializer that fk
            package_unavailable_date_serializer = PackageUnavailableDateSerializer(instance=unavailable_date_instance, data=unavailable_date_data, partial=True)
            package_unavailable_date_serializer.is_valid(raise_exception=True)
            package_unavailable_date_serializer.save()