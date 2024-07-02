#===============================================> Local Import
from backend.settings import STRIPE_SECRET_KEY
from derleng.serializers import Payment_methodSerializer
from derleng.models import Payment_method

#===============================================> Library
from rest_framework.response import Response
from rest_framework import status
import stripe


stripe.api_key = STRIPE_SECRET_KEY

class Payment_methodMixin:
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
            
            # isPaymentMethodExist = Payment_method.objects.filter(last4=request_data["last4"]).exists()
            # if isPaymentMethodExist:
            #     message = "Sorry, the payment method you're attempting to add already exists in our system. Please double-check your payment details or choose a different payment method."
            #     raise ValueError(message)
            
            if payment_method_id not in [existing_payment_method.id for existing_payment_method in existing_payment_methods]:
                try:
                    stripe.PaymentMethod.attach(
                        payment_method_id,
                        customer=customer.id
                    )
                except Exception as error:
                    raise Exception(error)
                

            else:
                error = "Payment method already associated with the customer."
                raise ValueError(error)
        
        # Set the default payment method to the newly attached payment method
        stripe.Customer.modify(
            customer.id,
            invoice_settings={
                'default_payment_method': payment_method_id,
            },
        )

        # Store payment method to database if associate payment with stripe success
        request_data['stripe_customer_id'] = customer.id
        request_data['stripe_payment_method_id'] = payment_method_id
        payment_method_instance = self.store_payment_method(request_data=request_data)

        return payment_method_instance


def create_payment_intent(stripe_customer_id, stripe_payment_method_id, amount, currency='usd'):
    intent = stripe.PaymentIntent.create(
        amount=int(amount),
        currency=currency,
        customer=stripe_customer_id,
        payment_method=stripe_payment_method_id,
        # confirmation_method='manual',
        confirm=True,
        # return_url='http://127.0.0.1:8000/admin/derleng/booking/',
        automatic_payment_methods={'enabled': True, 'allow_redirects': 'never'}
    )

    return intent

def create_transfer(destination, amount, currency="usd"):
    transfer = stripe.Transfer.create(
        amount=amount,
        currency=currency,
        destination=destination,
    )

    return transfer

