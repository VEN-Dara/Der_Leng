from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from authentication.permissions import UserRolePermission
from derleng.models import Cart, Package_service
from derleng.serializers import CartSerializer, MediumCartSerializer
from rest_framework.permissions import IsAuthenticated


class CartAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self , request):
        try:
            cartList = request.user.cart_set.filter(booking_details__isnull=True).distinct()
            serializer = MediumCartSerializer(cartList , many = True)
            
            return Response(serializer.data , status=status.HTTP_200_OK)
        except Exception as error:
            return Response( {'error' : str(error)} , status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        try:
            user = request.user
            data = request.data.copy()
            data['user'] = user.id
            serializers = CartSerializer(data=data)
            serializers.is_valid(raise_exception=True)
            serializers.save()

            response_data = {
                'message': 'Item added to cart successfully.',
                'cart_item_data': serializers.data
            }
            return Response(response_data, status=status.HTTP_200_OK)
        except Exception as error:
            return Response({'error': str(error)}, status=status.HTTP_404_NOT_FOUND)

    def put (self , request , pk ):
        try:
            cart_id = Cart.objects.get(pk=pk)
            serializer = CartSerializer(cart_id , data=request.data , partial = True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            
            respone_data = {
                'message' : 'Cart update Successfully',
                'data' : serializer.data
            }
            return Response(respone_data , status=status.HTTP_201_CREATED)
        except Exception as error:
            return Response( {'error' : str(error)} , status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self , request, pk):
        try:
            cart_id = Cart.objects.get(pk=pk)
            cart_id.delete()
            return Response({'Delete Successfully'} , status=status.HTTP_204_NO_CONTENT)
        except Cart.DoesNotExist:
            return Response({'error': 'Cart not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as error:
            return Response({'error': str(error)}, status=status.HTTP_400_BAD_REQUEST)
        