var configuration = require('./');

module.exports.register = function (socket, app) {
  socket.on('nachos.json', function (data, callback) {
    configuration.getConfig(callback);
  });

  socket.on('appdata', function (data, callback) {
    configuration.getAppData(app, callback);
  })
};