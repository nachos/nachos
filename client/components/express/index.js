'use strict';

angular.module('nachosApp')
  .service('server', function(expressConfig, socketioConfig, serverRoutes) {
    var express = require('express');

    var app = express();
    var server = require('http').createServer(app);
    var socketio = require('socket.io')(server, {
      //serveClient: (config.env === 'production') ? false : true,
      //path: '/socket.io-client'
    });

    expressConfig(app);
    serverRoutes(app);
    socketioConfig(socketio);

    this.start = function () {
      server.listen(9000, 'localhost', function () {
        console.log('Express server listening on %d', 9000);
      });
    };

    this.stop = function () {
      server.stop();
    }
  });