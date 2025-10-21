// ИНИЦИАЛИЗАЦИЯ КАРТЫ
var map = L.map('map').setView([55.7558, 37.6176], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// ИКОНКИ
var defaultIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var activeIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// ПЕРЕМЕННЫЕ
var markers = {};
var activeMarker = null;

// ФУНКЦИИ
function showPlaceInfo(place) {
    // Сбрасываем предыдущую активную метку
    if (activeMarker) {
        activeMarker.setIcon(defaultIcon);
    }
    
    // Находим и выделяем метку
    if (markers[place.title]) {
        markers[place.title].setIcon(activeIcon);
        activeMarker = markers[place.title];
    }

    document.getElementById('place-title').textContent = place.title;
    document.getElementById('place-desc').innerHTML = place.description_long;

    var img = document.getElementById('place-img');
    if (place.imgs && place.imgs.length > 0) {
        img.src = place.imgs[0];
        img.style.display = 'block';
    } else {
        img.style.display = 'none';
    }

    document.getElementById('sidebar').style.display = 'block';
}

function hideSidebar() {
    document.getElementById('sidebar').style.display = 'none';
    if (activeMarker) {
        activeMarker.setIcon(defaultIcon);
        activeMarker = null;
    }
}

// КНОПКА ЗАКРЫТИЯ
document.getElementById('close-btn').onclick = hideSidebar;

// ЗАГРУЗКА ДАННЫХ ИЗ API
function loadPlacesFromAPI() {
    // Пока загружаем места по одному (потом сделаем список всех мест)
    fetch('/places/1/')
        .then(response => response.json())
        .then(place => {
            var marker = L.marker([place.coordinates.lat, place.coordinates.lng], {icon: defaultIcon})
                .addTo(map)
                .on('click', function() {
                    showPlaceInfo(place);
                });
            markers[place.title] = marker;
        })
        .catch(error => console.error('Error loading place:', error));
}

// ЗАГРУЗКА ПРИ СТАРТЕ
loadPlacesFromAPI();