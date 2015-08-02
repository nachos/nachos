'use strict';

function onConnect(socket) {
}

function onDisconnect(socket) {
}

module.exports = function (socketio) {
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

    socket.on('settings.global-changed', function (data) {
      socket.broadcast.emit('settings.global-changed:' + data.app, data.config);
    });

    socket.on('settings.instance-changed', function (data) {
      socket.broadcast.emit('settings.instance-changed:' + data.instance, data.config);
    });

    socket.on('custom', function (data) {
      socket.broadcast.emit('custom.' + data.name, data.data);
    });
  });
};