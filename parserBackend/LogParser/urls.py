"""parserBackend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from django.urls import include, re_path
from LogParser import views

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path

urlpatterns = [
                  path('admin/', admin.site.urls),
                  path('api/log/<str:pk>', views.log_detail, name='log_detail'),
                  path('api/log', views.log_list),
                  path('api/log/id/(?P<pk>[0-9]+)', views.log_detail),
                  path('api/log/owner', views.log_list_published),
                  path("api/upload", views.upload, name="upload"),

              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
