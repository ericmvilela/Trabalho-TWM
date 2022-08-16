from rest_framework import serializers
from . import services
from .models import User
from planos.models import Plano


class PlanosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plano
        fields = ['plano']


class MeSerializer(serializers.ModelSerializer):
    planos = PlanosSerializer(many=True)

    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'cpf', 'birthdate', 'cep', 'street', 'numero', 'complemento', 'bairro',
                  'cidade', 'uf', 'sobre', 'curriculum', 'tecnico', 'planos']




class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField()
    email = serializers.CharField()
    password = serializers.CharField(write_only=True)
    cpf = serializers.CharField(required=False)
    birthdate = serializers.DateField(required=False)
    cep = serializers.CharField(required=False)
    street = serializers.CharField(required=False)
    numero = serializers.CharField(required=False)
    complemento = serializers.CharField(required=False)
    bairro = serializers.CharField(required=False)
    cidade = serializers.CharField(required=False)
    uf = serializers.CharField(required=False)
    sobre = serializers.CharField(required=False)
    curriculum = serializers.FileField(required=False)
    tecnico = serializers.BooleanField(default=False)

    def to_internal_value(self, data):
        data = super().to_internal_value(data)

        return services.UserDataClass(**data)