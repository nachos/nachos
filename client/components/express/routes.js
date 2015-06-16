'use strict';

angular.module('nachosApp')
  .factory('serverRoutes', function(systemRouter) {
    return function(app) {

      // Insert routes below
      app.use('/api/system', systemRouter());
    };
  });
