var map = L.map('map').setView([55.7558, 37.6176], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
// Данные мест

var places = {
    'sobor': {
        title: 'Покровский собор',
        coords: [55.7525, 37.6231],
        image: 'static/img/Cathedral.jpeg',
        description: 'Один из самых узнаваемых символов Москвы и России. Собор был построен в 1555-1561 годах по приказу Ивана Грозного в честь взятия Казани. Архитектурный ансамбль состоит из 9 церквей, расположенных на одном фундаменте.<br><br>Уникальная особенность собора - ни один из его куполов не повторяет другой по форме и цвету. Высота храма составляет 65 метров. Вплоть до 1600 года это было самое высокое здание в Москве.<br><br>Собор включён в список Всемирного наследия ЮНЕСКО и является филиалом Государственного исторического музея. Ежегодно его посещают более 500 000 туристов со всего мира.<br><br><strong>Адрес:</strong> Красная площадь, 7<br><strong>Время работы:</strong> 11:00-18:00, выходной - вторник'
    },
    'theatre': {
        title: 'Большой театр',
        coords: [55.7602, 37.6186],
        image: 'static/img/Bolshoi Theater.jpeg',
        description: 'Один из крупнейших в России и один из самых значительных в мире театров оперы и балета. Комплекс зданий театра расположен в центре Москвы, на Театральной площади.<br><br>Историческая сцена Большого театра открыта после реконструкции в 2011 году. Театр имеет богатейшую историю, которая насчитывает более 240 лет.<br><br>В репертуаре театра - классические оперы и балеты, а также современные постановки. Большой театр - символ русской культуры и гордость страны.<br><br><strong>Адрес:</strong> Театральная площадь, 1<br><strong>Стоимость билетов:</strong> от 1000 до 15000 рублей'
    }
};

// иконки для выделения
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

// Переменные для отслеживания активной метки
var markers = {};

var activeMarker = null;

// Функция показа информации
function showPlaceInfo(placeId) {
    if (activeMarker) {
        activeMarker.setIcon(defaultIcon);
    }
    markers[placeId].setIcon(activeIcon);
    activeMarker = markers[placeId];
    var place = places[placeId];
    document.getElementById('place-title').textContent = place.title;
    document.getElementById('place-desc').innerHTML = place.description;
    var img = document.getElementById('place-img');
    if (place.image) {
        img.src = place.image;
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

// Кнопка закрытия
document.getElementById('close-btn').onclick = hideSidebar;

// метки
markers.sobor = L.marker(places.sobor.coords, {icon: defaultIcon})
    .addTo(map)
    .on('click', function() { showPlaceInfo('sobor'); });

markers.theatre = L.marker(places.theatre.coords, {icon: defaultIcon})
    .addTo(map)
    .on('click', function() { showPlaceInfo('theatre'); });