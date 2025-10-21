from django.db import models

from django.db import models


class Place(models.Model):
    title = models.CharField(max_length=200)
    description_long = models.TextField(blank=True)
    lng = models.FloatField()
    lat = models.FloatField()

    def __str__(self):
        return self.title

class Image(models.Model):
    place = models.ForeignKey(Place, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='places/')
    position = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['position']