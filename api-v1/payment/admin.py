from django.contrib import admin
from .models import PaymentMethod, CustomerPayment, SellerTransaction, CustomerRefund

class PaymentMethodAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'type', 'holder_name', 'brand', 'last4', 'is_active', 'is_default', 'created_at')
    list_filter = ('type', 'brand', 'is_active', 'is_default', 'created_at')
    search_fields = ('user__username', 'holder_name', 'brand', 'last4')
    ordering = ('-created_at',)

class CustomerPaymentAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer', 'booking', 'payment_intent_id','amount', 'amount_received', 'currency', 'payment_method', 'status', 'created')
    list_filter = ('currency', 'status', 'created')
    search_fields = ('customer__username', 'booking__id', 'payment_method__type', 'status')
    ordering = ('-created',)

class SellerTransactionAdmin(admin.ModelAdmin):
    list_display = ('id', 'seller', 'BookingDetails', 'commission', 'amount', 'amount_received', 'currency', 'payment_method', 'status', 'created')
    list_filter = ('currency', 'status', 'created')
    search_fields = ('seller__username', 'BookingDetails__id', 'payment_method__type', 'status')
    ordering = ('-created',)

class CustomerRefundAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer', 'BookingDetails', 'amount', 'amount_refunded', 'currency', 'stripe_admin_account_id', 'payment_method', 'description', 'status', 'created')
    list_filter = ('currency', 'status', 'created')
    search_fields = ('customer__username', 'BookingDetails__id', 'payment_method__type', 'description', 'status')
    ordering = ('-created',)

admin.site.register(PaymentMethod, PaymentMethodAdmin)
admin.site.register(CustomerPayment, CustomerPaymentAdmin)
admin.site.register(SellerTransaction, SellerTransactionAdmin)
admin.site.register(CustomerRefund, CustomerRefundAdmin)
