(function () {
    'use strict';
    angular.module('calendarApp', ['ui.calendar'])
        .controller('calendarController', ['$scope', '$http', 'uiCalendarConfig', function ($scope, $http, uiCalendarConfig) {
            $scope.events = [];
            $scope.format = "DD/MM/YYYY HH:mm A";
            $scope.startView = "month";
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


            /* Change View */
            $scope.changeView = function (view, calendar) {
                uiCalendarConfig.calendars[calendar].fullCalendar('changeView', view);
            };
            /* Change View */
            $scope.renderCalender = function (calendar) {
                if (uiCalendarConfig.calendars[calendar]) {
                    uiCalendarConfig.calendars[calendar].fullCalendar('render');
                }
            };

            function getCalendarEvents() {
                clearCalendar();
                $scope.events.slice(0, $scope.events.length);
                $http.get("http://localhost:3000/events")
                    .then(function (result) {
                        var data = result.data;
                        console.log(data);
                        angular.forEach(data, (item) => {
                            $scope.events.push(item);
                        })
                    }, function (err) {
                        console.error(err);
                    })
            }
            $scope.showModal = function (event) {
                event.start = formatDate(event.start);
                $scope.event = event;
                $('#myModal').modal('toggle');
            }
            $scope.uiConfig = {
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
                    timeFormat: {
                        month: ' ', // for hide on month view
                        agenda: 'h:mm t'
                    },
                    eventClick: function (event) {
                        console.log(event);
                        $scope.showModal(event);
                    },
                    eventAfterAllRender: function () {
                        if ($scope.events.length > 0) {
                            uiCalendarConfig.calendars.myCalendar.fullCalendar('gotoDate', $scope.events[0].start);
                        }
                    }
                }
            }
            getCalendarEvents();
            $scope.eventSources = [$scope.events];
        }]);
})()
