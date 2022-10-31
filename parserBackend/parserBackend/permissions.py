from rest_framework import permissions
from rest_framework.permissions import BasePermission

from LogParser.models import LogParserPermission


# class IsOwner(permissions.BasePermission):
#     message = "Not an owner."
#
#     def has_object_permission(self, request, view, obj):
#         if request.method in permissions.SAFE_METHODS:
#             return True
#         return request.user == obj.owner

# class IsOwner(BasePermission):
#     def has_object_permission(self, request, view, obj):
#         if isinstance(obj, LogParserPermission):
#             return obj.owner == request.user
#         return obj.owner == request.user
