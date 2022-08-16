from django.db import models
from django.contrib.auth import models as auth_models


class UserManager(auth_models.BaseUserManager):
    def create_user(self, name: str, cpf: str, email: str, password: str = None, is_staff=False, is_superuser=False, tecnico=False) -> 'User':
        if not email:
            raise ValueError('User must have an email')
        if not name:
            raise ValueError('User must have a first name')
        if not cpf:
            raise ValueError('User must have an CPF')

        user = self.model(email=self.normalize_email(email))
        user.name = name
        user.cpf = cpf
        user.set_password(password)
        user.is_active = True
        user.is_staff = is_staff
        user.is_superuser = is_superuser
        user.tecnico = tecnico
        user.save()

        return user

    def create_superuser(self, name: str, email: str, cpf: str, password: str = None) -> 'User':
        user = self.create_user(
            name=name,
            cpf=cpf,
            email=email,
            password=password,
            is_staff=True,
            is_superuser=True,
            tecnico=True
        )
        user.save()

        return user


def filePath(instance, filename):
    return f'{instance.cpf}/{filename}'


class User(auth_models.AbstractUser):
    name = models.CharField(verbose_name='Name', max_length=255)
    email = models.CharField(verbose_name='Email', max_length=255, unique=True)
    password = models.CharField(max_length=100)
    cpf = models.CharField(max_length=15, null=True, blank=True)
    birthdate = models.DateField(null=True)
    cep = models.CharField(max_length=10, null=True, blank=True)
    street = models.CharField(max_length=255, null=True, blank=True)
    numero = models.CharField(max_length=7, null=True, blank=True)
    complemento = models.CharField(max_length=100, null=True, blank=True)
    bairro = models.CharField(max_length=100, null=True, blank=True)
    cidade = models.CharField(max_length=100, null=True, blank=True)
    uf = models.CharField(max_length=3, null=True, blank=True)
    sobre = models.CharField(max_length=512, null=True, blank=True)
    curriculum = models.FileField(upload_to=filePath, null=True, blank=True)
    tecnico = models.BooleanField(default=False)


    username = None

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'cpf']
