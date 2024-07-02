#===============================================> Django
from django.views.decorators.csrf import csrf_exempt

#===============================================> Framework Import
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

#===============================================> Local Import
from backend.settings import STRIPE_SECRET_KEY
from derleng.mixins import Payment_methodMixin
from derleng.models import Payment_method
from derleng.serializers import BasicPayment_methodSerializer, Payment_methodSerializer

#===============================================> Library
import stripe

stripe.api_key = STRIPE_SECRET_KEY

class Payment_methodAPIView(APIView, Payment_methodMixin.Payment_methodMixin):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            payments = Payment_method.objects.filter(user=request.user).order_by('-created_at')
            serializers = BasicPayment_methodSerializer(payments , many=True)
            return Response(serializers.data , status=status.HTTP_200_OK)
        except Exception as error:
            return Response( {'error' : str(error)} , status=status.HTTP_400_BAD_REQUEST)

    # @csrf_exempt
    def post(self, request):
        try:
            request_data = request.data.copy()
            request_data["user"] = request.user.id

            payment_method_instance = self.save_stripe_info(request_data=request_data, user=request.user)

            return Response(BasicPayment_methodSerializer(payment_method_instance).data, status=status.HTTP_200_OK)   
        except Exception as error:
            return Response({"error": str(error)}, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, pk):
        try:
            instance = Payment_method.objects.get(pk=pk)
            stripe.PaymentMethod.detach(instance.stripe_payment_method_id)
            instance.delete()
            return Response({"message": "Payment method deleted sucessfully."}, status=status.HTTP_200_OK)
        except Exception as error:
            return Response({"error": str(error)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def test_payment(request):
    test_payment_intent = stripe.PaymentIntent.create(
        amount=1000, currency='pln', 
        payment_method_types=['card'],
        receipt_email='test@example.com')
    return Response(status=status.HTTP_200_OK, data=test_payment_intent)

@api_view(['POST'])
def test_payment_intent(request):
    try:
        user = request.user
        amount = 40*100
        customer_id = "cus_PQfLqxAVY1kcVm"
        Payment_method_id = "pm_1OboNgEhnoYmMdGFVSoexeDs"
        payment = Payment_methodMixin.create_payment_intent(customer_id=customer_id, payment_method_id=Payment_method_id,amount=amount)
        return Response(data=payment, status=status.HTTP_200_OK)
    except Exception as error:
        return Response({"error": str(error)}, status=status.HTTP_400_BAD_REQUEST)
        
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST'])
def create_refund(request):
    # refund = stripe.Refund.create(
    # payment_intent="pi_3OejQHEhnoYmMdGF0HxjIYFe",
    # amount=10000
    # )

    refund = stripe.AccountLink.create(
        account='{{CONNECTED_ACCOUNT_ID}}',
        refresh_url="https://example.com/reauth",
        return_url="https://example.com/return",
        type="account_onboarding",
    )


    return Response(data=refund)