'use strict';

sp.factory('Event', ['railsResourceFactory', function (railsResourceFactory){
    return railsResourceFactory({
      url: '/events',
      name: 'event'
    });
}]);
