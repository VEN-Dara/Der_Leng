from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse, JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from derleng.models import *
from derleng.serializations import * 
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
    
    
    
        
    
            