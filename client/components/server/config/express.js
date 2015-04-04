'use strict';

angular.module('nachosApp')
  .config(function(serverProvider) {
    var morgan = require('morgan');
    var bodyParser = require('body-parser');
    var methodOverride = require('method-override');

    serverProvider.configureApp(function(app) {
      app.use(bodyParser.urlencoded({ extended: false }));
      app.use(bodyParser.json());
      app.use(methodOverride());
      app.use(morgan('dev'));
    });
  });
