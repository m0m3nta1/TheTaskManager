document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'ru', // Устанавливаем русский язык
        firstDay: 1, // Неделя начинается с понедельника
        events: [],
        editable: true,
        eventClick: function(info) {
            alert('Мероприятие: ' + info.event.title + '\nВремя: ' + info.event.extendedProps.time);
        },
        buttonText: {
            today: 'сегодня' // Изменяем текст кнопки "today" на "сегодня"
        }
    });
    calendar.render();

    var events = JSON.parse(localStorage.getItem('events')) || [];

    // Функция для форматирования даты
    function formatDate(dateString) {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('ru-RU', options);
    }

    // Функция для форматирования времени
    function formatTime(timeString) {
        return new Date('1970-01-01T' + timeString + 'Z').toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    }

    // Функция для обновления календаря
    function updateCalendar() {
        updateEventColors();
        calendar.removeAllEvents();
        calendar.addEventSource(events);
        localStorage.setItem('events', JSON.stringify(events));
        updateEventLists();
    }

    // Функция для обновления списков мероприятий
    function updateEventLists() {
        var today = new Date().toISOString().split('T')[0];
        var pastEvents = events.filter(event => event.start < today);
        var futureEvents = events.filter(event => event.start >= today);

        document.getElementById('past-events').innerHTML = pastEvents.map(event => `
            <div class="event-item past-event">
                <span>${event.title} - ${formatDate(event.start)} в ${formatTime(event.extendedProps.time)}</span>
                <button onclick="deleteEvent('${event.start}', '${event.extendedProps.time}')">Удалить</button>
            </div>
        `).join('');

        document.getElementById('future-events').innerHTML = futureEvents.map(event => `
            <div class="event-item">
                <span>${event.title} - ${formatDate(event.start)} в ${formatTime(event.extendedProps.time)}</span>
                <button onclick="deleteEvent('${event.start}', '${event.extendedProps.time}')">Удалить</button>
            </div>
        `).join('');
    }

    // Функция для удаления мероприятия
    window.deleteEvent = function(date, time) {
        events = events.filter(event => event.start !== date || event.extendedProps.time !== time);
        updateCalendar();
    }

    // Функция для обновления цвета событий
    function updateEventColors() {
        var today = new Date().toISOString().split('T')[0];
        events.forEach(event => {
            if (event.start < today) {
                event.backgroundColor = '#dc3545'; // Красный цвет для прошедших событий
            } else {
                event.backgroundColor = '#007bff'; // Синий цвет для предстоящих событий
            }
        });
    }

    // Инициализация календаря с сохраненными мероприятиями
    updateCalendar();

    document.getElementById('event-form').addEventListener('submit', function(event) {
        event.preventDefault();
        var name = document.getElementById('event-name').value;
        var date = document.getElementById('event-date').value;
        var time = document.getElementById('event-time').value;

        var eventData = {
            title: name,
            start: date + 'T' + time,
            backgroundColor: '#007bff', // Цвет фона для событий
            extendedProps: {
                time: time
            }
        };

        events.push(eventData);
        updateCalendar();

        document.getElementById('event-name').value = '';
        document.getElementById('event-date').value = '';
        document.getElementById('event-time').value = '';
    });

    // Функция для открытия/закрытия вкладок
    window.toggleTab = function(evt, tabName) {
        var tabcontent = document.getElementById(tabName);
        var tablinks = evt.currentTarget;

        if (tabcontent.style.display === "block") {
            tabcontent.style.display = "none";
            tablinks.classList.remove("active");
        } else {
            var i, tabcontentArray, tablinksArray;
            tabcontentArray = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontentArray.length; i++) {
                tabcontentArray[i].style.display = "none";
            }
            tablinksArray = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinksArray.length; i++) {
                tablinksArray[i].className = tablinksArray[i].className.replace(" active", "");
            }
            tabcontent.style.display = "block";
            tablinks.className += " active";
        }
    }
});
