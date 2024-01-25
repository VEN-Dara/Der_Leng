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
from derleng.models import Payment_method
from derleng.serializers import BasicPayment_methodSerializer, Payment_methodSerializer

#===============================================> Library
import stripe

stripe.api_key = STRIPE_SECRET_KEY

class Payment_methodAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            payments = Payment_method.objects.filter(user=request.user)
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
        
    def store_payment_method(self, request_data):
        serializer = Payment_methodSerializer(data=request_data)
        serializer.is_valid(raise_exception=True)
        return serializer.save()
    
    def save_stripe_info(self, request_data, user):
        email = f'{user.username}@derleng.com'
        name = user.username
        payment_method_id = request_data['payment_method_id']

        # Checking if customer already exist
        customer_data = stripe.Customer.list(email=email).data

        if len(customer_data) == 0:
            customer = stripe.Customer.create(email=email, name=name, payment_method=payment_method_id)
        else:
            customer = customer_data[0]

            # Check if the payment method is already associated with the customer
            existing_payment_methods = stripe.PaymentMethod.list(
                customer=customer.id,
                type=request_data["type"]
            ).data

            if payment_method_id not in [existing_payment_method.id for existing_payment_method in existing_payment_methods]:
                stripe.PaymentMethod.attach(
                    payment_method_id,
                    customer=customer.id
                )

                # Update the default payment method to the newly attached payment method
                stripe.Customer.modify(
                    customer.id,
                    invoice_settings={
                        'default_payment_method': payment_method_id,
                    },
                )

            else:
                error = "Payment method already associated with the customer."
                raise ValueError(error)
        
        # Store payment method to database if associate payment with stripe success
        request_data['customer_id'] = customer.id
        payment_method_instance = self.store_payment_method(request_data=request_data)

        return payment_method_instance

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
        payment = create_payment_intent(customer_id=customer_id, payment_method_id=Payment_method_id,amount=amount)
        return Response(data=payment, status=status.HTTP_200_OK)
    except Exception as error:
        return Response({"error": str(error)}, status=status.HTTP_400_BAD_REQUEST)

def create_payment_intent(customer_id, payment_method_id, amount, currency='usd'):
    intent = stripe.PaymentIntent.create(
        amount=amount,
        currency=currency,
        customer=customer_id,
        payment_method=payment_method_id,
        # confirmation_method='manual',
        confirm=True,
        # return_url='http://127.0.0.1:8000/admin/derleng/booking/',
        automatic_payment_methods={'enabled': True, 'allow_redirects': 'never'}
    )

    return intent
        