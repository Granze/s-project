'use strict';

sp.factory('Geoloc', function ($q , $rootScope){
    return {
      getPosition: function () {
        var deferred = $q.defer();
        navigator.geolocation.getCurrentPosition(function (pos) {
          $rootScope.$apply(function () {
            deferred.resolve(angular.copy(pos));
          })
        }, function (error) {
          $rootScope.$apply(function () {
            deferred.reject(error);
          })
        });
        return deferred.promise;
      }
    }
});
