from django.shortcuts import render
from .models import Place

def home(request):
    places = Place.objects.all()
    print("=== DEBUG ===")
    print("Places count:", places.count())
    for place in places:
        print(f"Place: {place.title}, Coords: {place.lat}, {place.lng}")
    print("=============")
    return render(request, 'index.html', {'places': places})


from django.http import JsonResponse


def place_detail(request, place_id):
    try:
        place = Place.objects.get(id=place_id)

        data = {
            "title": place.title,
            "imgs": [
                image.image.url for image in place.images.all()
            ],
            "description_long": place.description,
            "coordinates": {
                "lng": place.lng,
                "lat": place.lat
            }
        }

        return JsonResponse(
            data,
            json_dumps_params={'ensure_ascii': False, 'indent': 2}
        )
    except Place.DoesNotExist:
        return JsonResponse({'error': 'Not found'}, status=404)


def places_list(request):
    places = Place.objects.all()
    data = []
    for place in places:
        data.append({
            'id': place.id,
            'title': place.title,
            'imgs': [image.image.url for image in place.images.all()],
            'description': place.description,
            'coordinates': {
                'lng': place.lng,
                'lat': place.lat
            }
        })
    return JsonResponse(data, safe=False, json_dumps_params={'ensure_ascii': False})