from django.contrib import admin

# Register your models here.
from .models import Guide_register_info, Profile_image, Category, Package, Package_image, Package_schedule, Package_service, Package_unavailable_date, Payment_method, Cart, Booking, Review, Thumbnail

@admin.register(Guide_register_info)
class GuideRegisterInfoAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'fullname_khmer', 'phone', 'address')

@admin.register(Profile_image)
class ProfileImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'type', 'is_active', 'created_at')
    list_filter = ('is_active', 'created_at' , 'type')

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields=('name',)

@admin.register(Package)
class PackageAdmin(admin.ModelAdmin):
    list_display = ('id', 'user_id', 'description', 'category_id', 'discount', 'address', 'video_url')
    search_fields = ( 'description' , )

@admin.register(Package_image)
class PackageImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'package_id', 'image')

@admin.register(Package_schedule)
class PackageScheduleAdmin(admin.ModelAdmin):
    list_display = ('id', 'package_id', 'destination', 'start_time', 'end_time')

@admin.register(Package_service)
class PackageServiceAdmin(admin.ModelAdmin):
    list_display = ('id', 'detail', 'package_id', 'price')
    search_fields = ('name',)
    list_filter = ( 'price' ,)

@admin.register(Package_unavailable_date)
class PackageUnavailableDateAdmin(admin.ModelAdmin):
    list_display = ('id', 'package', 'unavailable_at')

@admin.register(Payment_method)
class PaymentMethodAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'type', 'number', 'holder_name', 'token')
    search_fields = ( 'holder_name' , 'number')
    list_filter=('type' ,)

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'service', 'customer_ammount', 'booking_date', 'created_at')

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('id', 'cart_id', 'is_accept', 'created_at')

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('id', 'user_id', 'package_id', 'rating', 'comment', 'created_at')

@admin.register(Thumbnail)
class ThumbnailAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'image', 'order_number')
