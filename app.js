(function () {
    'use strict';
    angular.module('calendarApp', ['ui.calendar'])
        .controller('calendarController', ['$scope', '$http', 'uiCalendarConfig', function ($scope, $http, uiCalendarConfig) {
            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();

            $scope.event = {
                eventSubject: "",
                startDate: "",
                endDate: "",
                eventDescription: ""
            }

            $scope.events = [
                { title: 'All Day Event', start: new Date(y, m, 1) },
                { title: 'Long Event', start: new Date(y, m, d - 5), end: new Date(y, m, d - 2) },
                { id: 999, title: 'Repeating Event', start: new Date(y, m, d - 3, 16, 0), allDay: false },
                { id: 999, title: 'Repeating Event', start: new Date(y, m, d + 4, 16, 0), allDay: false },
                { title: 'Birthday Party', start: new Date(y, m, d + 1, 19, 0), end: new Date(y, m, d + 1, 22, 30), allDay: false },
            ];
            $scope.eventRender = function (event, element, view) {
                element.attr({
                    'tooltip': event.title,
                    'tooltip-append-to-body': true
                });
                $compile(element)($scope);
            };

            $scope.addEvent = function () {
                console.log($scope.event);
            };

            $scope.alertOnEventClick = function (date, jsEvent, view) {
                $scope.alertMessage = (date.title + ' was clicked ');
            };

            $scope.uiConfig = {
                calendar: {
                    header: {
                        left: 'title',
                        center: '',
                        right: 'today prev,next'
                    },
                    eventClick: $scope.alertOnEventClick,
                    eventRender: $scope.eventRender
                }
            };
            $scope.eventSources = [$scope.events];
        }]);
})()
