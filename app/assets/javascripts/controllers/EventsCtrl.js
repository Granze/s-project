'use strict';

sp.controller('EventsCtrl', ['$scope', 'Geoloc', 'Event', '$log', function ($scope, Geoloc, Event, $log){

  google.maps.visualRefresh = true;

  $scope.map = {
    center: {
      latitude: 45.465985,
      longitude: 9.180994
    },
    zoom: 13,
    options: {
      panControl: false,
      zoomControl: false,
      scaleControl: false,
      streetViewControl: false,
      mapTypeControl: false
    },
    bounds: {},
    eventsMarkers: []
  };

  $scope.events = Event.query();

  $scope.events.then(function (results) {
    angular.forEach(results, function (key, value){
      $scope.map.eventsMarkers.push(key, value);
    });
  }, function (error) {
    $log.error('error');
  });

  $scope.locateMe = function () {
    if (navigator.geolocation) {
      Geoloc.getPosition().then(function (pos) {
        var latitude = pos.coords.latitude,
            longitude = pos.coords.longitude;
        $scope.map.center = {latitude: latitude, longitude: longitude};
      });
    } else {
      alert('Geolocation isn\'t supported');
    };
  };

  $scope.searchLocationMarker = {
    id: 0,
    coords: {},
    options: {
      draggable: true,
      animation: 2
    },
    events: {
      dragend: function (marker, eventName, args) {
        $log.info('new locations set');
        $scope.event.coords = [marker.getPosition().lat(), marker.getPosition().lng()];
        $scope.$apply();
      }
    }
  };

  $scope.findLocation = function () {
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({'address': $scope.event.location}, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var latitude = results[0].geometry.location.lat(),
            longitude = results[0].geometry.location.lng();

        $scope.searchLocationMarker.coords = {};
        $scope.map.zoom = 16;
        $scope.map.center = {latitude: latitude, longitude: longitude};
        $scope.searchLocationMarker.coords = {latitude: latitude, longitude: longitude};
        $scope.event.coords = [latitude, longitude];
        $scope.notFound = false;
        $scope.$apply();
      } else {
        $scope.notFound = true;
        $scope.$apply();
      }
    });
  };

  $scope.eventCreate = function (data) {
    new Event({
      from_date: data.date + " " + data.time + ":00",
      to_date: data.date + " " + data.time + ":00",
      style: data.style,
      description: data.description,
      latitude: data.coords[0],
      longitude: data.coords[1],
      user_id: 1
    }).create();
  };

  //TODO remove this
  $scope.timeList = ['00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'];

}]);
