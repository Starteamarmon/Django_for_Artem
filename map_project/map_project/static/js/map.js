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
    if (activeMarker) {
        activeMarker.setIcon(defaultIcon);
    }

    if (markers[place.title]) {
        markers[place.title].setIcon(activeIcon);
        activeMarker = markers[place.title];
    }

    document.getElementById('place-title').textContent = place.title;
    document.getElementById('place-desc').innerHTML = place.description;

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

document.getElementById('close-btn').onclick = hideSidebar;

// ЗАГРУЗКА ДАННЫХ ИЗ API
function loadPlacesFromAPI() {
    console.log('Loading places from API...');

    fetch('/places/')
        .then(response => {
            console.log('Response status:', response.status);
            return response.json();
        })
        .then(places => {
            console.log('Places loaded:', places);
            console.log('Number of places:', places.length);

            places.forEach(place => {
                console.log('Creating marker for:', place.title);
                var marker = L.marker([place.coordinates.lat, place.coordinates.lng], {icon: defaultIcon})
                    .addTo(map)
                    .on('click', function() {
                        showPlaceInfo(place);
                    });
                markers[place.title] = marker;
            });
        })
        .catch(error => console.error('Error loading places:', error));
}

// ЗАПУСК ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
document.addEventListener('DOMContentLoaded', function() {
    loadPlacesFromAPI();
});