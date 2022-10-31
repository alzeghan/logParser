from django.conf import settings
from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class LogParserPermission(models.Model):
    name = models.CharField(max_length=255, null=True, default='')
    owner = models.ForeignKey('auth.User', related_name='place_list', on_delete=models.CASCADE, null=True)


class LogFile(models.Model):
    id = models.AutoField(primary_key=True)
    file_name = models.CharField(max_length=70, blank=False, default='')
    description = models.CharField(max_length=200, blank=False, default='')
    path = models.CharField(max_length=200, blank=False, default='')
    owner = models.CharField(max_length=200, blank=False, default='')
    created_at = models.CharField(max_length=200, blank=False, default='')

    def __str__(self):
        return self.id


class LogFileDetail(models.Model):
    log_id = models.AutoField(primary_key=True)
    raw_number = models.CharField(max_length=200, blank=False, default='')
    raw_text = models.CharField(max_length=200, blank=False, default='')
    created_at = models.CharField(max_length=200, blank=False, default='')
    flagged = models.BooleanField(default=False)
    log_file_id = models.IntegerField()

    def __str__(self):
        return self.log_id


class ReadLogFile(models.Model):
    file = models.FileField(upload_to="logs/")
