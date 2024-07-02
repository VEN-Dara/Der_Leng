from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Cart, Booking, BookingDetails, Review

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'service', 'customer_amount', 'booking_date', 'created_at')
    search_fields = ('user__username', 'service__name', 'booking_date')
    list_filter = ('created_at', 'booking_date')

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer', 'total_price', 'currency', 'created_at')
    search_fields = ('customer__username', 'total_price')
    list_filter = ('created_at', 'currency')

@admin.register(BookingDetails)
class BookingDetailsAdmin(admin.ModelAdmin):
    list_display = ('id', 'cart', 'booking', 'unit_price', 'currency', 'percentage_discount', 'is_accepted', 'is_closed', 'created_at')
    search_fields = ('cart__id', 'booking__id', 'unit_price')
    list_filter = ('created_at', 'is_accepted', 'is_closed')

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'package', 'booking_details', 'rating', 'comment', 'created_at')
    search_fields = ('user__username', 'package__name', 'rating')
    list_filter = ('created_at', 'rating')

