from rest_framework import serializers
from payment.models import CustomerPayment, CustomerRefund, PaymentMethod, SellerTransaction

class BasicPaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentMethod
        exclude = ('stripe_payment_method_id', 'stripe_customer_id')

class PaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentMethod
        fields = '__all__'

class CustomerPaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerPayment
        fields = '__all__'

class CustomerRefundSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerRefund
        fields = '__all__'

class SellerTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SellerTransaction
        fields = '__all__'