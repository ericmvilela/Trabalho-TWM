from django.contrib import admin
from . import models

class UserAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'name',
        'cpf',
        'email',
        'is_superuser'
    )
    list_display_links = (
        'id',
        'name',
        'cpf'
    )
    readonly_fields = (
        'password',
    )

admin.site.register(models.User, UserAdmin)