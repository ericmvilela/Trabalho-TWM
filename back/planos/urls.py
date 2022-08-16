from django.urls import path
from . import apis

urlpatterns = [
    path("plano/", apis.SetPlano.as_view(), name="register"),
]