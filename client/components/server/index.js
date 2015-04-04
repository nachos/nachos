'use strict';

angular.module('nachosApp')
  .provider('server', function() {
    var express = require('express');

    var app = express();
    var server = require('http').createServer(app);
    var socketio = require('socket.io')(server, {
      //serveClient: (config.env === 'production') ? false : true,
      //path: '/socket.io-client'
    });

    this.configureApp = function (callback) {
      callback(app);
    };

    this.configureSocket = function (callback) {
      callback(socketio);
    };

    this.$get = function () {
      var self = {};

      self.start = function () {
        server.listen(9000, 'localhost', function () {
          console.log('Express server listening on %d', 9000);
        });
      };

      return self;
    };
  });