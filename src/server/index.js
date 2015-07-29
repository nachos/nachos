'use strict';

var express = require('express');
var _ = require('lodash');
var app = express();
var server = require('http').createServer(app);
var socketio = require('socket.io')(server, {});
var nachosConfig = require('nachos-config');

require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);

var start = function () {
  var port = _.random(1024, 65535);

  server.listen(port, 'localhost', function () {
    console.log('Express server listening on %d', port);
    nachosConfig.set({port: port})
      .catch(function (err) {
        console.log(err);
      });
  });
};

var stop = function () {
  server.close();
};

server.on('error', function (e) {
  if (e.code == 'EADDRINUSE') {
    console.log('Address in use, retrying...');
    stop();
    start();
  }
});

module.exports.start = start;
module.exports.stop = stop;
