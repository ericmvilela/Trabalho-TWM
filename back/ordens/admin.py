from django.contrib import admin
from .models import Ordem


class OrdemAdmin(admin.ModelAdmin):
    list_display = ('id', 'reclamacao', 'user')
    list_display_links = ('id', 'reclamacao',)
    readonly_fields = ('user', )


admin.site.register(Ordem, OrdemAdmin)
