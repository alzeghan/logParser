from datetime import datetime
import re
from django.contrib.auth import login
from django.contrib.auth import logout
from django.db.models import Q
from django.http import HttpResponse
from django.http import JsonResponse
from django.core.exceptions import ObjectDoesNotExist

import rest_framework
from rest_framework import status, viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.admin import User
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.utils import json
from rest_framework.views import APIView

import LogParser
from LogParser import serializers
from LogParser.serializers import LogFile, LogFileSerializer, LogFileDetail, UserSerializer, RegisterSerializer, \
    LogFileDetailSerializer
from django.core.files.storage import FileSystemStorage

from rest_framework import generics, permissions
from rest_framework import views
from rest_framework.response import Response


# Create your views here.
@api_view(['GET', 'POST', 'DELETE'])
def log_list(request):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        content = {
            'user': str(request.user),  # `django.contrib.auth.User` instance.
            'auth': str(request.auth),  # None
        }
        return Response(content)

    try:
        print('log_list received')
        if request.method == 'GET':
            ownerUserName = request.GET.get('ownerId', None)
            print('load all files: ', ownerUserName)
            log = LogFile.objects.filter(Q(owner=ownerUserName))
            print("getting all logs")
            log_serializer = LogFileSerializer(log, many=True)
            return JsonResponse(log_serializer.data, safe=False)
        elif request.method == 'POST':
            log_data = JSONParser().parse(request)
            print('log_data')
            print(log_data)
            log_serializer = LogFileSerializer(data=log_data)
            if log_serializer.is_valid():
                log_serializer.save()
                return JsonResponse(log_serializer.data, status=status.HTTP_201_CREATED)
            return JsonResponse(log_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except ObjectDoesNotExist as e:
        return JsonResponse({'message': 'The log does not exist'}, status=rest_framework.status.HTTP_404_NOT_FOUND)


@api_view(['GET', 'PUT', 'DELETE'])
def log_detail(request, pk):
    # find log by pk (id)
    try:
        print('in log details endpoint' + pk)
        if request.method == 'GET':
            fileId = pk

            log = LogFileDetail.objects.filter(Q(log_file_id=fileId))
            log_serializer = LogFileDetailSerializer(log, many=True)

            return JsonResponse(log_serializer.data, safe=False)
    except ObjectDoesNotExist as e:
        return JsonResponse({'message': 'The log does not exist'}, status=rest_framework.status.HTTP_404_NOT_FOUND)




@api_view(['GET'])
def log_list_published(request):
    try:
        print('log_list_published received')
        data = serializers.LogFileSerializer().data
        return HttpResponse(data, status=rest_framework.status.HTTP_200_OK)
    except ObjectDoesNotExist as e:
        return JsonResponse({'message': 'The log does not exist'}, status=rest_framework.status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def upload(request):
    if request.method == 'POST' and request.FILES['upload']:
        uploadLog = request.FILES['upload']
        fss = FileSystemStorage()
        print(upload)
        ownerId = request.POST.get('ownerId')
        print(ownerId)
        file = fss.save(uploadLog.name, uploadLog)
        file_url = fss.url(file)
        print(file_url)
        new_log_id = 0
        try:
            s_file_name = uploadLog.name
            s_description = 'desc'
            s_path = file_url
            s_owner = ownerId

            log_data = {
                'file_name': s_file_name,
                'description': s_description,
                'path': s_path,
                'owner': s_owner,
                'created_at': str(datetime.now())
            }

            log_serializer = LogFileSerializer(data=log_data)
            # print(log_serializer)
            if log_serializer.is_valid():
                print('log file is valid')
                log_serializer.save()
                # print(log_serializer)
                new_log_id = log_serializer['id'].value
        except ObjectDoesNotExist as e:
            print("Error while saving log file", e)
            return JsonResponse({'message': 'Error while processing log file'},
                                status=rest_framework.status.HTTP_404_NOT_FOUND)

        for i, line in enumerate(uploadLog, 1):
            matching_regex = r"(^\d.+)\sServer-\d.+\sUsage:\s(\d.+)%\sRam\sUsage:\s(\d.+)GB"
            print(str(line.decode().strip()))
            parsedLine = re.fullmatch(matching_regex, str(line.decode().strip()))

            if parsedLine:

                print("regex parse successful.")
                # print(parsedLine.groups())
                lineCreationDate = parsedLine.group(1)
                cpuUsage = parsedLine.group(2)
                ramUsage = parsedLine.group(3)
                # print(lineCreationDate, ' ', cpuUsage , ' ' , ramUsage)
                if float(cpuUsage) > 90 and float(ramUsage) > 3.5:
                    # print(lineCreationDate, ' ', cpuUsage, ' ', ramUsage)
                    s_log_id = new_log_id
                    s_flagged = True
                    s_creation_time = str(lineCreationDate)
                    s_raw_number = i
                    line_data = {
                        'log_file_id': s_log_id,
                        'flagged': s_flagged,
                        'raw_text': str(line.decode().strip()),
                        'created_at': s_creation_time,
                        'raw_number': s_raw_number
                    }
                    serializerLog = LogFileDetailSerializer(data=line_data)
                    # print(serializerLog)
                    if serializerLog.is_valid():
                        print('line is valid')
                        serializerLog.save()
            else:
                print("Error: regex parsing unsuccessful.")

        return JsonResponse({'message': 'Log Upladed Successfully'}, status=rest_framework.status.HTTP_200_OK)
    return JsonResponse({'message': 'Error while log upload'}, status=status.HTTP_400_BAD_REQUEST)


class LoginView(views.APIView):
    # This view should be accessible also for unauthenticated users.
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = serializers.LoginSerializer(data=self.request.data,
                                                 context={'request': self.request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)

        token, created = Token.objects.get_or_create(user=user)
        print(user.username)
        print(token)
        user_data = {
            'username': user.username,
            'token': token
        }
        # return HttpResponse(user_data, status=status.HTTP_202_ACCEPTED)
        return HttpResponse(json.dumps({'username': str(user.username), 'token': str(token)}),
                            content_type="application/json")
        # return JsonResponse(serializer.errors, status=400)


class RegisterView(generics.CreateAPIView):
    print("in signup")
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = serializers.RegisterSerializer


REDIRECT_FIELD_NAME = ''


class LogoutView(APIView):
    """
    Logs out the user and displays 'You are logged out' message.
    """
    permission_classes = (permissions.AllowAny,)

    # authentication_classes = (TokenAuthentication, )

    def post(self, request, format=None):
        try:
            # permission_classes = (IsAuthenticated,)
            print('logout user')
            logout(request)
            return HttpResponse("Ok", status=rest_framework.status.HTTP_200_OK)
        except ObjectDoesNotExist as e:
            return JsonResponse({'message': 'The log does not exist'}, status=rest_framework.status.HTTP_404_NOT_FOUND)


class isLoggedInView(generics.CreateAPIView):
    """
    Logs out the user and displays 'You are logged out' message.
    """

    def post(self, request, format=None):
        try:
            print('will logout')
            print(permission_classes)
            # serializer_class = serializers.RegisterSerializer
            logout(request)
            print('logout user successfully')

            return HttpResponse("Ok", status=rest_framework.status.HTTP_200_OK)
        except ObjectDoesNotExist as e:
            return JsonResponse({'message': 'The log does not exist'}, status=rest_framework.status.HTTP_404_NOT_FOUND)
