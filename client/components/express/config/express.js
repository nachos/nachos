'use strict';

angular.module('nachosApp')
  .factory('expressConfig', function() {
    var morgan = require('morgan');
    var bodyParser = require('body-parser');
    var methodOverride = require('method-override');

    return function (app) {
      app.use(bodyParser.urlencoded({ extended: false }));
      app.use(bodyParser.json());
      app.use(methodOverride());
      app.use(morgan('dev'));
    };
  });
