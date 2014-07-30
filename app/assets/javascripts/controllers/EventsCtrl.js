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

}]);
