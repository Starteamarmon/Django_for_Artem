from django.contrib import admin
from .models import Place, Image

@admin.register(Place)
class PlaceAdmin(admin.ModelAdmin):
    list_display = ['title', 'lng', 'lat']
    search_fields = ['title']

@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    list_display = ['place', 'position']
    list_filter = ['place']