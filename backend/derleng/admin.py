from django.contrib import admin

# Register your models here.
from .models import Booking_details, Commission, Customer_payments, Guide_register_info, Profile_image, Category, Package, Package_image, Package_schedule, Package_service, Package_unavailable_date, Payment_method, Cart, Booking, Review, Seller_transactions, Thumbnail

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
    list_display = ('id', 'user', 'type', 'holder_name', 'brand', 'last4', 'payment_method_id', 'exp_month', 'exp_year')
    search_fields = ( 'holder_name' ,)
    list_filter=('type' ,)

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'service', 'customer_ammount', 'booking_date', 'created_at')

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer', 'total_price', 'created_at')

@admin.register(Booking_details)
class Booking_detailsAdmin(admin.ModelAdmin):
    list_display = ('id', 'card', 'booking', 'unit_price', 'discount', 'is_accepted', 'created_at')

@admin.register(Customer_payments)
class Customer_paymentsAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer', 'booking', 'amount', 'amount_received', 'currency', 'stripe_customer_id', 'stripe_payment_method_id', 'status', 'created')

@admin.register(Seller_transactions)
class Seller_transactionsAdmin(admin.ModelAdmin):
    list_display = ('id', 'seller', 'booking_details', 'commission', 'amount', 'amount_received', 'currency', 'stripe_admin_account_id', 'stripe_payment_method_id', 'status', 'created')

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('id', 'user_id', 'package_id', 'rating', 'comment', 'created_at')

@admin.register(Thumbnail)
class ThumbnailAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'image')

@admin.register(Commission)
class CommissionAdmin(admin.ModelAdmin):
    list_display = ('id', 'type', 'percentage_of_sale_price')
