from rest_framework.permissions import BasePermission

SAFE_METHODS = ('GET', 'HEAD', 'OPTIONS')

class UserRolePermission:
    
    def is_admin(self, user):
        return bool( user and user.is_authenticated and user.role.name == "admin" )

    def is_staff(self, user):
        return bool( user and user.is_authenticated and user.role.name == "staff" )

    def is_tour_guide(self, user):
        return bool( user and user.is_authenticated and user.role.name == "tour_guide" )

    def is_customer(self, user):
        return bool( user and user.is_authenticated and user.role.name == "customer" )
    
class IsAdminOrOnly(BasePermission, UserRolePermission):
    def has_permission(self, request, view):
        return bool(
            request.method in SAFE_METHODS or
            self.is_admin(user=request.user))

class IsAdminOrStaffOrReadOnly(BasePermission, UserRolePermission):
    def has_permission(self, request, view):
        return bool(
            request.method in SAFE_METHODS or
            self.is_staff(user=request.user) or
            self.is_admin(user=request.user)
        )

class IsAdminOrStaffOrTourGuideOrReadOnly(BasePermission, UserRolePermission):
    def has_permission(self, request, view):
        print()
        return bool(
            request.method in SAFE_METHODS or
            self.is_admin(user=request.user) or self.is_staff(user=request.user) or self.is_tour_guide(user=request.user)
        )
    
class IsAdmin(BasePermission, UserRolePermission):
    def has_permission(self, request, view):
        return self.is_admin(user=request.user)
    
class IsStaff(BasePermission, UserRolePermission):
    def has_permission(self, request, view):
        return self.is_staff(user=request.user)
    
class IsTour_Guide(BasePermission, UserRolePermission):
    def has_permission(self, request, view):
        return self.is_tour_guide(user=request.user)
    
class IsCustomer(BasePermission, UserRolePermission):
    def has_permission(self, request, view):
        return self.is_customer(user=request.user)
    
class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return bool(request.method in SAFE_METHODS)
    

    