'use strict';

sp.controller('EventsCtrl', ['$scope', 'Geoloc', 'Event', function($scope, Geoloc, Event){

  google.maps.visualRefresh = true;

  if (navigator.geolocation) {
    Geoloc.getPosition().then(function(pos){
      var latitude = pos.coords.latitude,
          longitude = pos.coords.longitude;

      $scope.map.center = {latitude: latitude, longitude: longitude};
    });
  } else {
    alert('Geolocation isn\'t supported');
  };

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
    bounds: {}
  };

  $scope.findLocation = function() {
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({'address': $scope.event.location}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var latitude = results[0].geometry.location.lat(),
            longitude = results[0].geometry.location.lng();

        $scope.markers.length = 0;
        $scope.center = {latitude: latitude, longitude: longitude};
        $scope.markers.push({latitude: latitude, longitude: longitude});
        $scope.event.coords = [latitude, longitude];
        $scope.notFound = false;
        $scope.$apply();
      } else {
        $scope.notFound = true;
        $scope.$apply();
      }
    });
  };

  $scope.events = Event.query();

  $scope.events.then(function (results) {
    console.log(results);
  }, function (error) {
    console.log('error');
  });

}]);
