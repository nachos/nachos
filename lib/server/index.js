var express = require('express');

var app = express();
var server = require('http').createServer(app);
var socketio = require('socket.io')(server, {
  //serveClient: (config.env === 'production') ? false : true,
  //path: '/socket.io-client'
});

require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);

var start = function () {
  // Start server
  server.listen(9000, 'localhost', function () {
    console.log('Express server listening on %d', 9000);
  });
};

module.exports = {
  start: start
};