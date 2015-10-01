'use strict';

module.exports = function (socketio) {
  socketio.on('connection', function (socket) {
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