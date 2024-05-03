from authentication.serializers import BasicUserSerializer
from tour_package.serializers import PackageServiceSerializer, SmallPackageSerializer
from .models import *
from rest_framework import serializers
from core.settings.base import MEDIA_URL 