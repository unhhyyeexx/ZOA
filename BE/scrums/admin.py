from django.contrib import admin
from .models import Scrum
# Register your models here.
class ScrumAdmin(admin.ModelAdmin) :
    list_display = ('emoji','user','family')
# Register your models here.
admin.site.register(Scrum,ScrumAdmin)