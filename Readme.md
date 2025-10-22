# Карта интересных мест Москвы

Django-приложение для интерактивной карты достопримечательностей Москвы.

## Установка и запуск

Клонируйте репозиторий:
`git clone https://github.com/Starteamarmon/Django_for_Artem`  
`cd map_project`

Создайте виртуальное окружение и установите зависимости:
`python -m venv venv`  
`source venv/bin/activate` (Linux/Mac)  
`venv\Scripts\activate` (Windows)  
`pip install -r requirements.txt`

Настройте базу данных:
`python manage.py migrate`  
`python manage.py createsuperuser`

Запустите сервер:
`python manage.py runserver`

Приложение будет доступно по адресу: `http://localhost:8000`

## Функциональность

- Интерактивная карта с метками интересных мест
- Детальная информация о каждом месте с фотографиями
- Админ-панель для управления контентом
- JSON API для доступа к данным
- Визуальный редактор для форматирования описаний

## API Endpoints

- `GET /` - главная страница с картой
- `GET /places/` - список всех мест в формате JSON
- `GET /places/<id>/` - детальная информация о месте в формате JSON

## Технологии

- Backend: Django 5.0+
- Frontend: Leaflet.js, JavaScript
- База данных: SQLite
- Редактор: django-ckeditor

Админ-панель доступна по адресу: `/admin`

## Рабочий пример
https://starteamarmon.pythonanywhere.com/
