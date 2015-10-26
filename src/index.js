'use strict';

var app = require('app');
var nachosOpen = require('nachos-open');
var nachosConfig = require('nachos-config');
var Q = require('q');
var auth = require('./auth');
var server = require('./server');

app.on('ready', function () {
  server.start()
    .then(function () {
      return auth.isAuthenticated();
    })
    .then(function (isAuthenticated) {
      if (!isAuthenticated) {
        return auth.login();
      }
    })
    .then(function () {
      return nachosConfig.get();
    })
    .then(function (config) {
      // This is TEMPORARY until nachos-config will be updated to 1.3.0
      config.startup = [];

      var startup = config.startup.map(function (app) {
        return nachosOpen(app);
      });

      return Q.all(startup.concat(nachosOpen(config.defaults.shell)));
    })
    .catch(function (err) {
      console.log(err);
    });
});