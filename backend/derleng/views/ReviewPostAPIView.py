from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse, JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from derleng.models import *
from derleng.serializations import * 
from rest_framework import status



class ReviewPostAPIView(APIView):
    def post(self  , request , *args, **kwargs):
        if request.user.is_authenticated:
            data = request.data
            serializers = ReviewSerializer(data=data)
            if serializers.is_valid():
                review = Review (
                    user_id = request.user,
                    package_id  = data.get('package_id'),
                    rating = data.get('rating'),
                    comment = data.get('comment'),
                )
                review.save()
                
                respone_data = {
                    'message' : 'Review post successfully.' ,
                    'review_data' : serializers.data
                }
                return Response( respone_data , status=status.HTTP_201_CREATED)
            return Response(serializers.errors , status=status.HTTP_400_BAD_REQUEST)