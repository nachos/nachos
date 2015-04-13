'use strict';

angular.module('nachosApp')
  .factory('serverRoutes', function(fsRouter) {
    return function(app) {

      // Insert routes below
      app.use('/api/fs', fsRouter());
    };
  });
