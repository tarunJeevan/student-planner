let Calendar
let Draggable = FullCalendar.Draggable
let elementClicked

function init() {
    document.addEventListener('mousemove', e => {
       elementClicked = e
    })

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
                    calendarMenu(info)
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

function completeEvent(info, element) {

    if (!info.event.classNames.includes("completed")) {
        info.event.setProp("classNames", info.event.classNames.concat(['completed']))
    }
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

function openContextMenu(menuName) {
    let element = document.elementFromPoint(elementClicked.clientX, elementClicked.clientY)
    let menu = getMenuInfo()

    element = element.parentElement
    
    if (!element.classList.contains("menuEnabled") && !element.classList.contains("menuItem")) {

        element.classList.add("menuEnabled")

        let main = document.createElement('div')
        let pcom = document.createElement('div')
        let pdel = document.createElement('div')
        let canc = document.createElement('div')

        main.classList.add("contextMenu")
        pdel.classList.add("menuItem")
        pcom.classList.add("menuItem")
        canc.classList.add("menuItem")
        canc.classList.add("menuItem-close")
        
        pdel.innerText = "New Note"
        pcom.innerText = "Existing Note"
        canc.innerText = "Close"

        pdel.addEventListener('click', function () {
        
        })

        pcom.addEventListener('click', function () {

        })

        canc.addEventListener('click', function () {
            removeEventMenu(main)
        })

        main.append(pcom)
        main.append(pdel)
        main.append(canc)

        element.append(main)
        console.log("done")
    }
}

function getMenuInfo(menuName){
    const menu = {
        numItems: 0,
        numClassNames: 0,
        itemNames: [],
        className: [],
        functionNames: [],
        useParent: function(elem){return false}
    }

    switch(menuName){
        case calendar:
            menu.numItems = 2
            menu.numClassNames = 0
            menu.itemNames = ["Complete", "Delete"]
            menu.functionNames = [completeEvent(), deleteEvent()]
            menu.useParent = function(elem){
                if (elem.classList.contains("fc-event-title")) {
                    return true
                }

                return false
            }
            break;
        case eventAdd:
            menu.numItems = 2
            menu.numClassNames = 1
            menu.itemNames = ["addNewEvent", "addExistingEvent"]
            menu.classNames = ["addEventMenu"]
            menu.functionNames = [addNewEvent(), addExistingEvent()]
            menu.useParent = function(elem){return true}
            break;
        case eventRemove:

            break;
    }

    return menu
}