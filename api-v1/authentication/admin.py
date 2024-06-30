from django.contrib import admin
from .models import *

# Register your models here.
# admin.site.register(User)

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'email', 'role','is_active', 'is_staff', 'date_joined')
    search_fields = ('username', 'email')
    list_filter = ('is_active', 'is_staff', 'date_joined')

@admin.register(User_role)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description')

class TourGuideRegistrationAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'fullname_khmer', 'fullname_english', 'phone', 'address', 'location_url')
    list_filter = ('fullname_khmer', 'fullname_english')
    search_fields = ('user__username', 'fullname_khmer', 'fullname_english', 'phone', 'address')
    ordering = ('-id',)

admin.site.register(TourGuideRegistration, TourGuideRegistrationAdmin)