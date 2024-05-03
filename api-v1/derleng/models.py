# ===============================> Core Library <=====================================
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
# ===============================> Third Party <=====================================
import uuid
# ===============================> Local <=====================================
from authentication.models import User
from tour_package.models import Package, PackageService

# Create your models here.
#====================================================> User Info


    