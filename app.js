(function () {
    'use strict';
    angular.module('calendarApp', ['ui.calendar']).controller('calendarController', calendarController);
    calendarController.$inject = ['$scope', '$http', 'uiCalendarConfig'];
    function calendarController($scope, $http, uiCalendarConfig) {
        var vm = this;
        vm.events = [];
        vm.format = "DD/MM/YYYY HH:mm A";
        function clearCalendar() {
            if (uiCalendarConfig.calendars.myCalendar != null) {
                uiCalendarConfig.calendars.myCalendar.fullCalendar('removeEvents');
                uiCalendarConfig.calendars.myCalendar.fullCalendar('unselect');
            }
        }
        function formatDate(date) {
            var newDate = new Date(date);
            return newDate.getDate().toString() + "/" + newDate.getMonth().toString() + "/" + newDate.getFullYear().toString() +
                " " + newDate.getHours().toString() + ":" + newDate.getMinutes().toString() + " " + newDate.getHours() > 12 ? "PM" : "AM";

        }
        vm.changeView = function (view, calendar) {
            uiCalendarConfig.calendars[calendar].fullCalendar('changeView', view);
        }
        vm.renderCalender = function (calendar) {
            if (uiCalendarConfig.calendars[calendar]) {
                uiCalendarConfig.calendars[calendar].fullCalendar('render');
            }
        }
        function getCalendarEvents() {
            clearCalendar();
            vm.events.slice(0, vm.events.length);
            $http.get("http://localhost:3000/events")
                .then(function (result) {
                    var data = result.data;
                    angular.forEach(data, (item) => {
                        vm.events.push(item);
                    })
                }, function (err) {
                    console.error(err);
                })
        }
        vm.showModal = function (event) {
            event.start = formatDate(event.start);
            vm.event = event;
            $('#myModal').modal('toggle');
        }

        function onEventClick(event, jsEvent, view) {
            console.log(event);
        }
        function onDayClick(event, jsEvent, view) {
            console.log(event);
        }

        vm.uiConfig = {
            calendar: {
                height: 600,
                displayEventTime: true,
                selectable: true,
                selectHelper: true,
                header: {
                    left: 'month agendaWeek agendaDay',
                    center: 'title',
                    right: 'today prev,next'
                },
                eventClick: onEventClick,
                dayClick: onDayClick
            }
        }
        getCalendarEvents();
        vm.eventSources = [vm.events];
    }
})()
