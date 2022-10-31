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
from django.urls import path, include, re_path
from LogParser import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
                  path('admin/', admin.site.urls),
                  path('api/log/<str:pk>', views.log_detail, name='logf_id'),
                  path('api/log', views.log_list),
                  path('api/log/id/(?P<pk>[0-9]+)', views.log_detail),
                  path('api/log/owner', views.log_list_published),
                  path('api/upload', views.upload, name='upload'),
                  path('api/admin/', admin.site.urls),
                  path('api/login/', views.LoginView.as_view()),
                  path('api/signup/', views.RegisterView.as_view()),
                  path('api/logout/', views.LogoutView.as_view(), name='logout_token'),
                  path('api/auth/', views.isLoggedInView.as_view(), name='token'),
                  # path('api/signup/', views.create_auth),
                  # path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
                  # path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(),name='token_refresh'),



              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
