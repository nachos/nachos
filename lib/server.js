var http = require('http');
var socketio = require('socket.io');

var start = function () {
  var server = http.createServer();
  var io = socketio.listen(server);

  server.listen(4567, 'localhost', function(){
    console.log('listening on 4567');
  });

  io.on('connection', function(socket){
    console.info('Connected');

    socket.on('register', function (data) {
      console.info('[%s] registered', data);
      require('./configuration/socket').register(socket, data);
    });
  });
};

module.exports = {
  start: start
};