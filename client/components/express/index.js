'use strict';

angular.module('nachosApp')
  .service('server', function (expressConfig, socketioConfig, serverRoutes) {
    var self = this;
    var express = require('express');
    var _ = require('lodash');
    var app = express();
    var server = require('http').createServer(app);
    var socketio = require('socket.io')(server, {});
    var nachosConfig = require('nachos-config')();

    expressConfig(app);
    serverRoutes(app);
    socketioConfig(socketio);

    server.on('error', function (e) {
      if (e.code == 'EADDRINUSE') {
        console.log('Address in use, retrying...');
        self.stop();
        self.start();
      }
    });

    this.start = function () {
      var port = _.random(1024, 65535);

      server.listen(port, 'localhost', function () {
        console.log('Express server listening on %d', port);
        nachosConfig.set({port: port}, function (err) {
          if (err) {
            console.log(err);
          }
        });
      });
    };

    this.stop = function () {
      server.close();
    }
  });