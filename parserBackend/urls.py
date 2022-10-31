from django.urls import include, re_path
from LogParser import views

urlpatterns = [
    re_path(r'^', include('log.urls')),
]