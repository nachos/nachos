'use strict';

angular.module('nachosApp')
  .factory('serverRoutes', function(fsRouter, userRouter) {
    return function(app) {

      // Insert routes below
      app.use('/api/fs', fsRouter());
      app.use('/api/user', userRouter());
    };
  });
