from rest_framework import serializers
from .models import Ordem


class OrdemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ordem
        fields = '__all__'


class OrdemSerializerGet(serializers.ModelSerializer):

    name = serializers.ReadOnlyField(source='user.name')
    rua = serializers.ReadOnlyField(source='user.street')
    numero = serializers.ReadOnlyField(source='user.numero')
    complemento = serializers.ReadOnlyField(source='user.complemento')
    bairro = serializers.ReadOnlyField(source='user.bairro')
    cidade = serializers.ReadOnlyField(source='user.cidade')
    uf = serializers.ReadOnlyField(source='user.uf')
    estadoCompleto = serializers.CharField(source='get_estado_display')

    class Meta:
        model = Ordem
        fields = ['id', 'reclamacao', 'imagem', 'estado', 'name', 'rua', 'numero', 'complemento',
                  'bairro', 'cidade', 'uf', 'estadoCompleto']
