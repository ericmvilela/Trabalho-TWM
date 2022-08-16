from django.db import models
from accounts.models import User


class Plano(models.Model):
    plano = models.CharField(max_length=255)
    user = models.ForeignKey(User, related_name='planos', on_delete=models.CASCADE)
