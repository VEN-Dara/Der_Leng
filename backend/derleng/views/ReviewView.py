from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse, JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from derleng.models import *
from derleng.serializers import *
from rest_framework import status
from rest_framework.permissions import IsAuthenticated , IsAuthenticatedOrReadOnly

class ReviewAPIView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    def post(self  , request , *args, **kwargs):
        try:
            print(request.user)
            data = request.data.copy()
            data['user'] = request.user.id
            data['package'] = data['package_id']
            print(data)
            serializers = ReviewSerializer(data=data)
            serializers.is_valid(raise_exception=True)
            serializers.save()
            
            respone_data = {
                'message' : 'Review post successfully.' ,
                'review_data' : serializers.data
            }
            return Response( respone_data , status=status.HTTP_201_CREATED)
        except Exception as error:
            return Response( {'error' : str(error)} , status=status.HTTP_400_BAD_REQUEST)
        
    def get(self ,request):
        try:
            reviewList = Review.objects.all()
            serializers = ReviewSerializer(reviewList , many = True)
            return Response(serializers.data , status=status.HTTP_201_CREATED)
        except Exception as error:
            return Response( {'error' : str(error)} , status=status.HTTP_400_BAD_REQUEST)
        
    def put(self , request , pk):
        try:
            review_id = Review.objects.get(pk=pk)
            print(request.user)
            print(pk)
            
            serializers = ReviewSerializer(review_id, data=request.data ,partial = True)
            
            serializers.is_valid(raise_exception=True)
            serializers.save()
            respone_data = {
                    'message' : 'Review Update successfully.' ,
                    'review_data' : serializers.data
                }
            return Response( respone_data , status=status.HTTP_201_CREATED)
        except Exception as error:
            return Response( {'error' : str(error)} , status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self ,request ,  pk):
        try:
            review_id = Review.objects.get(pk=pk)
            print(pk)
            review_id.delete()
            return Response({'Delete Successfully'} , status=status.HTTP_204_NO_CONTENT)
        except Review.DoesNotExist:
            return Response({'error': 'Review not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as error:
            return Response({'error': str(error)}, status=status.HTTP_400_BAD_REQUEST)

            
            
