'use strict';

var express = require('express');
var socketio = require('socket.io');
var _ = require('lodash');
var Q = require('q');
var nachosConfig = require('nachos-config');
var http = require('http');
var debug = require('debug')('nachos:server');
var socketioConfig = require('./config/socketio');
var expressConfig = require('./config/express');
var routesConfig = require('./routes');

/**
 * Creating server wrapper
 *
 * @constructor
 */
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

      self.stop()
        .then(function () {
          return self.start();
        });
    }
  });
}

/**
 * Expose the constructor
 * @type {Server}
 */
Server.prototype.Server = Server;

/**
 * Starts server on random port
 *
 * @returns {Q.promise} Successfully started server
 */
Server.prototype.start = function () {
  var port = _.random(1024, 65535);

  return Q.ninvoke(this._server, 'listen', port, 'localhost')
    .then(function () {
      debug('Express server listening on %d', port);

      return nachosConfig.set({port: port});
    });
};

/**
 * Stops server
 *
 * @returns {Q.promise} Successfully stopped server
 */
Server.prototype.stop = function () {
  return Q.ninvoke(this._server, 'close');
};

module.exports = new Server();