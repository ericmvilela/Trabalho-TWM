from django.urls import path
from . import apis

urlpatterns = [
    path("ordem/", apis.SetOrdem.as_view(), name="register"),
    path("minhas-ordens/", apis.SetOrdem.as_view(), name="register"),
]