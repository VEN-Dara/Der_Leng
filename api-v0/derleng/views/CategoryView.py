from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from django_filters.rest_framework import DjangoFilterBackend

from derleng.models import Category
from derleng.serializers import CategorySerializer
from authentication.permissions import IsAdminOrStaffOrReadOnly

class CategoryAPIView(APIView):
    permission_classes = [IsAdminOrStaffOrReadOnly]

    def get(self , request):
        try:
            CategoryList = Category.objects.all()
            serializers = CategorySerializer(CategoryList , many = True)
            return Response(serializers.data)
        except Exception as error:
            return Response( {'error' : str(error)} , status=status.HTTP_400_BAD_REQUEST)

    def post(self , request):
        try:
            serializers = CategorySerializer(data=request.data)
            if serializers.is_valid():
                serializers.save()
                respone_data = {
                    'message' : 'Review Update successfully.' ,
                    'review_data' : serializers.data
                }
            return Response( respone_data , status=status.HTTP_201_CREATED)
        except Exception as error:
            return Response( {'error' : str(error)} , status=status.HTTP_400_BAD_REQUEST)
    
    def put(self , request , pk):
        try:
            category_id = Category.objects.get(id=pk)
            serializers = CategorySerializer(category_id ,data = request.data )
            if serializers.is_valid():
                serializers.save()
                respone_data = {
                    'message' : 'Review Update successfully.' ,
                    'review_data' : serializers.data
                }
            return Response( respone_data , status=status.HTTP_202_ACCEPTED)
        except Exception as error:
            return Response( {'error' : str(error)} , status=status.HTTP_400_BAD_REQUEST)
    
    def delete (self , request , pk):
        try:
            category_id  = Category.objects.get(id=pk)
            category_id.delete()
            return Response({'Delete Successfully'} , status=status.HTTP_204_NO_CONTENT)
        except Exception as error:
            return Response({'error': str(error)}, status=status.HTTP_400_BAD_REQUEST)
        
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminOrStaffOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = '__all__'