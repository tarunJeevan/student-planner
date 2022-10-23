var Calendar;
var Draggable = FullCalendar.Draggable;
var numClick = 0;

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
                        extendedProps: {
                            completed: false
                        },
                        classNames: ["calendarevent"]
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

                },
                eventClick: function (info) {
                    console.log(info.jsEvent);
                    info.jsEvent.preventDefault();
                    openCalendarMenu(info);
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

function openCalendarMenu(info) {
    element = document.elementFromPoint(info.jsEvent.pageX, info.jsEvent.pageY);
    console.log(element.classList);
    if (!element.classList.contains("menuEnabled")) {
        element.classList.add("menuEnabled");

        let main = document.createElement('div');
        let pdel = document.createElement('div');
        let pcom = document.createElement('div');

        main.classList.add("contextMenu");
        
        pdel.innerText = "Delete";
        pdel.addEventListener("onclick", function(ev){
            deleteEvent(info)
        });
        pdel.classList.add("menuEnabled");

        pcom.innerText = "Complete"
        pcom.addEventListener("onclick", completeEvent(info));
        pcom.classList.add("menuEnabled");

        main.append(pdel);
        main.append(pcom);
        element.append(main);
    }
}

function completeEvent(info, main) {
    const events = Calendar.getEvents();
    const classList = ['completed']

    for (let i = 0; i < events.length; i++) {
        //events[i].setProp("classNames", classList);
    }
}

function deleteEvent(info, main) {
    info.event.remove();
}