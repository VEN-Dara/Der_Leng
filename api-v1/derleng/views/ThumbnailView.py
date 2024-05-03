from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse, JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from authentication.permissions import IsAdminOrStaffOrReadOnly
from derleng.models import *
from derleng.serializers import *
from rest_framework import status

class ThumbnailAPIView(APIView):
    permission_classes = [IsAdminOrStaffOrReadOnly]

    def get(self , request):
        try:
            thumbnailList = Thumbnail.objects.all()
            serializer = ThumbnailSerializer(thumbnailList , many = True)
            return Response(serializer.data)
        except Exception as error:
          return Response( {'error' : str(error)} , status=status.HTTP_400_BAD_REQUEST)
    
    def post(self , request):
        try:
            serializers = ThumbnailSerializer(data=request.data)
            if serializers.is_valid():
                serializers.save()
                respone_data = {
                    'message' : 'Review post successfully.' ,
                    'data' : serializers.data
                }
                return Response(respone_data , status=status.HTTP_201_CREATED)
        except:
            return Response(serializers.errors , status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            thumbnail_instance = Thumbnail.objects.get(id=pk)
            serializer = ThumbnailSerializer(thumbnail_instance, data=request.data)
            if serializer.is_valid():
                serializer.save()   
                respone_data = {
                    'message' : 'Review update successfully.' ,
                    'data' : serializer.data
                }
                return Response(respone_data , status=status.HTTP_201_CREATED)
        except:
          return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self , request , pk):
        try:
            thumbnail_instance = Thumbnail.objects.get(id=pk)
            thumbnail_instance.delete()
            return Response({'Delete Successfully'} , status=status.HTTP_204_NO_CONTENT)
        except Thumbnail.DoesNotExist:
            return Response({'error': 'Thumbnail not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as error:
            return Response({'error': str(error)}, status=status.HTTP_400_BAD_REQUEST)
    
        