from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse, JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializations import *
from rest_framework import status

# Create your views here.
def index(request):
    return HttpResponse('Hello Dara, this is me.')

class ThumbnailAPIView(APIView):
    def get(self , request):
        thumbnailList = Thumbnail.objects.all()
        serializer = ThumbnailSerializer(thumbnailList , many = True)
        return Response(serializer.data)
    
    def post(self , request):
        serializers = ThumbnailSerializer(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data , status=status.HTTP_201_CREATED)
        return Response(serializers.errors , status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        print(pk)
        thumbnail_instance = Thumbnail.objects.get(id=pk)
        print(pk)
        print(thumbnail_instance)
        serializer = ThumbnailSerializer(thumbnail_instance, data=request.data)
        if serializer.is_valid():
            serializer.save()   
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
    def delete(self , request , pk):
        thumbnail_instance = Thumbnail.objects.get(id=pk)
        thumbnail_instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class CategoryAPIView(APIView):
    def get(self , request):
        CategoryList = Category.objects.all()
        serializers = CategorySerializer(CategoryList , many = True)
        return Response(serializers.data)
    

    def post(self , request):
        serializers = CategorySerializer(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response (serializers.data , status=status.HTTP_201_CREATED)
        return Response (serializers.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self , request , pk):
        category_id = Category.objects.get(id=pk)
        serializers = CategorySerializer(category_id ,data = request.data )
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data)
        return Response(serializers.errors , status=status.HTTP_400_BAD_REQUEST)
    
    def delete (self , request , pk):
        category_id  = Category.objects.get(id=pk)
        category_id.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class ReviewPostAPIView(APIView):
    def post(self  , request , *args, **kwargs):
        data = request.data
        serializers = ReviewSerializer(data=data)
        if serializers.is_valid():
            if request.user.is_authenticated:
                review = Review (
                    user_id = request.user,
                    package_id  = data.get('package_id'),
                    rating = data.get('rating'),
                    comment = data.get('comment'),
                )
            
            review.save()
            return Response({'messgae' : 'Successfully'} , status=status.HTTP_201_CREATED)
        return Response(serializers.errors , status=status.HTTP_400_BAD_REQUEST)
        