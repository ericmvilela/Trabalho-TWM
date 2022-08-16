from rest_framework import views, response, permissions, exceptions
from . import serializer as ordem_serializer
from accounts import authentication
from .models import Ordem


class SetOrdem(views.APIView):
    authentication_classes = (authentication.CustomUserAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        data = {}
        for dado in request.data:
            data[dado] = request.data[dado]
        data['user'] = request.user.id
        serializer = ordem_serializer.OrdemSerializer(data=data)
        serializer.is_valid(raise_exception=True)

        novaOrdem = Ordem(**serializer.validated_data)
        novaOrdem.save()

        newSerializer = ordem_serializer.OrdemSerializer(novaOrdem)

        return response.Response(newSerializer.data)

    def get(self, request):
        if request.user.tecnico:
            todasOrdems = []
            for ordem in Ordem.objects.all():
                serializer = ordem_serializer.OrdemSerializerGet(ordem)
                serializer.data['estado-completo'] = ordem.get_estado_display()
                print(serializer.data)
                todasOrdems.append(serializer.data)

            return response.Response(todasOrdems)

        raise exceptions.AuthenticationFailed('Necessário ser técnico')

    def patch(self, request):
        if request.user.tecnico:
            opcoes = ['E', 'A', 'F', 'C']
            if request.data['estado'] not in opcoes:
                raise exceptions.ParseError('Valor inválido')

            ordem = Ordem.objects.filter(id=request.data['id']).first()
            ordem.estado = request.data['estado']
            ordem.save()

            serializer = ordem_serializer.OrdemSerializer(ordem)
            return response.Response(serializer.data)