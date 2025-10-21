from django.contrib import admin
from .models import Place, Image

class ImageInline(admin.TabularInline):  # или admin.StackedInline
    model = Image
    extra = 1  # Количество пустых форм для новых фото

@admin.register(Place)
class PlaceAdmin(admin.ModelAdmin):
    inlines = [ImageInline]  # ⬅️ Добавляем inline для фотографий
    list_display = ['title', 'lng', 'lat']

@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    list_display = ['place', 'position']