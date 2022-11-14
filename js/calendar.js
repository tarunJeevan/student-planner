var Calendar
var Draggable = FullCalendar.Draggable
var numClick = 0

function init() {
    document.addEventListener('DOMContentLoaded',
        function () {
            var containerEl = document.getElementById('external-events')
            var calendarEl = document.getElementById('calendar')

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
                    }
                }
            })

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
                    info.jsEvent.preventDefault()
                    openCalendarMenu(info)
                }
            })

            Calendar.render()
        })
}

function appendEvent() {
    var eventDiv = document.getElementById("external-events")
    eventDiv.append(createNewEventDiv())
    return false
}

function createNewEventDiv() {
    var outerDiv = document.createElement('div')
    var innerDiv = document.createElement('div')


    innerDiv.className = "fc-event-main"
    innerDiv.id = "eventelement"
    innerDiv.append(document.createTextNode("My event"))
    outerDiv.className = "fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event"

    outerDiv.append(innerDiv)
    return outerDiv
}

function openCalendarMenu(info) {
    element = document.elementFromPoint(info.jsEvent.pageX, info.jsEvent.pageY)

    if (element.classList.contains("fc-event-title")) {
        element = element.parentElement
    }

    if (!element.classList.contains("menuEnabled") && !element.classList.contains("menuItem")) {

        element.classList.add("menuEnabled")

        let main = document.createElement('div')
        let pcom = document.createElement('div')
        let pdel = document.createElement('div')
        let canc = document.createElement('div')

        main.classList.add("contextMenu")
        pdel.classList.add("menuItem")
        pcom.classList.add("menuItem")
        canc.classList.add("menuItems")
        canc.classList.add("menuItem-close")
        
        pdel.innerText = "Delete"
        pcom.innerText = "Complete"
        canc.innerText = "Close"

        pdel.addEventListener('click', function () {
            deleteEvent(info, element)
            removeEventMenu(main)
        })

        pcom.addEventListener('click', function () {
            completeEvent(info, element)
            removeEventMenu(main)
        })

        canc.addEventListener('click', function () {
            removeEventMenu(main)
        })

        main.append(pcom)
        main.append(pdel)
        main.append(canc)

        element.append(main)
    }
}

function completeEvent(info, element) {

    if (!info.event.classNames.includes("completed")) {
        info.event.setProp("classNames", info.event.classNames.concat(['completed']))
    }
    console.log(info.event.classNames)
    return false
}

function deleteEvent(info, element) {
    info.event.remove()
    return false
}

function removeEventMenu(element) {
    var child = element.lastElementChild
    while (child) {
        element.removeChild(child)
        child = element.lastElementChild
    }

    element.parentElement.classList.remove("menuEnabled")
    element.remove()
}