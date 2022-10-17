var Calendar;
var Draggable = FullCalendar.Draggable;

function init() {
    document.addEventListener('DOMContentLoaded',
        function () {
            var containerEl = document.getElementById('external-events');
            var calendarEl = document.getElementById('calendar');

            // initialize the external events

            new Draggable(containerEl, {
                itemSelector: '.fc-event',
                eventData: function (eventEl) {
                    return {
                        title: eventEl.innerText,
                        editable: true,
                        extendedProps:{
                            completed: false
                        },
                        classNames:[]
                    };
                }
            });

            //initialize calendar
            Calendar = new FullCalendar.Calendar(calendarEl, {
                headerToolbar: {
                    left: 'prev next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                },
                editable: true,
                droppable: true,
                drop: function (info) {
                }
            });

            Calendar.render();
        });
}

function appendEvent() {
    var eventDiv = document.getElementById("external-events");
    eventDiv.append(createNewEventDiv());
    return false;
}

function createNewEventDiv() {
    var outerDiv = document.createElement('div');
    var innerDiv = document.createElement('div');


    innerDiv.className = "fc-event-main";
    innerDiv.id = "eventelement"
    innerDiv.append(document.createTextNode("My event"));
    outerDiv.className = "fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event";

    outerDiv.append(innerDiv);
    return outerDiv;
}
