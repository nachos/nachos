'use strict';

var express = require('express');
var socketio = require('socket.io');
var _ = require('lodash');
var nachosConfig = require('nachos-config');
var http = require('http');
var debug = require('debug')('nachos:server');
var socketioConfig = require('./config/socketio');
var expressConfig = require('./config/express');
var routesConfig = require('./routes');

function Server() {
  var self = this;

  self._app = express();
  self._server = http.createServer(self._app);

  var socketServer = socketio(self._server);

  socketioConfig(socketServer);
  expressConfig(self._app);
  routesConfig(self._app);

  self._server.on('error', function (e) {
    if (e.code === 'EADDRINUSE') {
      debug('Address in use, retrying...');
      self.stop();
      self.start();
    }
  });
}

Server.prototype.Server = Server;

Server.prototype.start = function () {
  var port = _.random(1024, 65535);

  this._server.listen(port, 'localhost', function () {
    debug('Express server listening on %d', port);
    nachosConfig.set({port: port})
      .catch(function (err) {
        debug(err);
      });
  });
};

Server.prototype.stop = function () {
  this._server.close();
};

module.exports = new Server();