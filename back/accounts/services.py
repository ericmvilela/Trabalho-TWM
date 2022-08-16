import dataclasses
from typing import TYPE_CHECKING
from . import models
import datetime
import jwt
from django.conf import settings

if TYPE_CHECKING:
    from .models import User


@dataclasses.dataclass
class UserDataClass():
    name: str
    email: str
    cpf: str = None
    birthdate: str = None
    cep: str = None
    street: str = None
    numero: str = None
    complemento: str = None
    bairro: str = None
    cidade: str = None
    uf: str = None
    password: str = None
    sobre: str = None
    curriculum: object = None
    tecnico: bool = None
    id: int = None

    @classmethod
    def from_instance(cls, user: "User") -> "UserDataClass":
        return cls(
            name=user.name,
            email=user.email,
            cpf=user.cpf,
            birthdate=user.birthdate,
            cep=user.cep,
            street=user.street,
            numero=user.numero,
            complemento=user.complemento,
            bairro=user.bairro,
            cidade=user.cidade,
            uf=user.uf,
            sobre=user.sobre,
            curriculum=user.curriculum,
            tecnico=user.tecnico,
            id=user.id

        )


def create_user(user_dc: "UserDataClass") -> "UserDataClass":
    instance = models.User(
        name=user_dc.name,
        email=user_dc.email,
        cpf=user_dc.cpf,
        birthdate=user_dc.birthdate,
        cep=user_dc.cep,
        street=user_dc.street,
        numero=user_dc.numero,
        complemento=user_dc.complemento,
        bairro=user_dc.bairro,
        cidade=user_dc.cidade,
        uf=user_dc.uf,
        sobre=user_dc.sobre,
        curriculum=user_dc.curriculum,
        tecnico=user_dc.tecnico,
        id=user_dc.id
    )

    if user_dc.password is not None:
        instance.set_password(user_dc.password)

    instance.save()

    return UserDataClass.from_instance(instance)


def user_email_selector(email: str) -> "User":
    user = models.User.objects.filter(email=email).first()

    return user

def create_token(user_id: int) -> str:
    payload = dict(
        id=user_id,
        exp=datetime.datetime.utcnow() + datetime.timedelta(hours=24),
        iat=datetime.datetime.utcnow()
    )
    token = jwt.encode(payload, settings.JWT_SECRET, algorithm='HS256')

    return token