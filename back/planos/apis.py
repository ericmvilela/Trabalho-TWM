from rest_framework import views, response, permissions
from . import serializer as plano_serializer
from accounts import authentication
from .models import Plano


class SetPlano(views.APIView):
    authentication_classes = (authentication.CustomUserAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        data = {'plano': request.data['plano'], 'user': request.user.id}

        serializer = plano_serializer.PlanoSerializer(data=data)
        serializer.is_valid(raise_exception=True)

        newPlano = Plano(**serializer.validated_data)
        newPlano.save()

        new_Serializer = plano_serializer.PlanoSerializer(newPlano)

        return response.Response(new_Serializer.data)
