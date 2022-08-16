from django.contrib import admin
from .models import Plano


class PlanosAdmin(admin.ModelAdmin):
    list_display = ('id', 'plano', 'user',)
    list_display_links = ('id', 'plano',)


admin.site.register(Plano, PlanosAdmin)
