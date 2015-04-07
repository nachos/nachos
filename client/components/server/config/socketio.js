'use strict';

angular.module('nachosApp')
  .config(function(serverProvider) {

    // When the user disconnects.. perform this
    function onDisconnect(socket) {

    }

    // When the user connects.. perform this
    function onConnect(socket) {

    }

    serverProvider.configureSocket(function (socketio) {
      socketio.on('connection', function (socket) {
        socket.address = socket.handshake.address !== null ?
        socket.handshake.address.address + ':' + socket.handshake.address.port : process.env.DOMAIN;

        socket.connectedAt = new Date();

        // Call onDisconnect.
        socket.on('disconnect', function () {
          onDisconnect(socket);
          console.info('[%s] DISCONNECTED', socket.address);
        });

        // Call onConnect.
        onConnect(socket);
        console.info('[%s] CONNECTED', socket.address);
      });
    });
  });