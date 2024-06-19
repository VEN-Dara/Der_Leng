from django.contrib import admin
from .models import PackageCategory, PackageChargeType, PackageCommission, Package, PackageImage, PackageSchedule, PackageService, PackageUnavailableDate

@admin.register(PackageCategory)
class PackageCategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')

@admin.register(PackageChargeType)
class PackageChargeTypeAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')

@admin.register(PackageCommission)
class PackageCommissionAdmin(admin.ModelAdmin):
    list_display = ('id', 'type', 'percentage_of_sale_price')

@admin.register(Package)
class PackageAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'user', 'category', 'charge_type', 'location_url', 'is_close', 'created_at')
    list_filter = ('is_close', 'created_at')
    search_fields = ('name', 'user__username', 'category__name')

@admin.register(PackageImage)
class PackageImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'package', 'type')
    list_filter = ('type',)

@admin.register(PackageSchedule)
class PackageScheduleAdmin(admin.ModelAdmin):
    list_display = ('id', 'package', 'destination', 'start_time', 'end_time')

@admin.register(PackageService)
class PackageServiceAdmin(admin.ModelAdmin):
    list_display = ('id', 'package', 'detail', 'price', 'currency', 'is_close')
    list_filter = ('is_close',)

@admin.register(PackageUnavailableDate)
class PackageUnavailableDateAdmin(admin.ModelAdmin):
    list_display = ('id', 'package', 'unavailable_at')
