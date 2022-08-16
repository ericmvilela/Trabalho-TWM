from django.db import models
from accounts.models import User

def filePath(instance, filename):
    return f'{instance.user.cpf}/{filename}'


class Ordem(models.Model):
    ESTADO_CHOICES = (
        ('A', 'Aguardando'),
        ('F', 'Finalizado'),
        ('C', 'Cancelado'),
        ('E', 'Em Progresso')
    )

    reclamacao = models.TextField()
    imagem = models.ImageField(upload_to=filePath, null=True, blank=True)
    user = models.ForeignKey(User, related_name='ordens', on_delete=models.CASCADE)
    estado = models.CharField(max_length=1, choices=ESTADO_CHOICES, blank=False, null=False, default='A')

    def __str__(self):
        return f'id: {self.id}'