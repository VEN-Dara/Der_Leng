from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse, JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from derleng.models import *
from derleng.serializations import * 
from rest_framework import status


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
