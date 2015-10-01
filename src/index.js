'use strict';

var app = require('app');
var nachosOpen = require('nachos-open');
var nachosConfig = require('nachos-config');
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
      return nachosOpen(config.defaults.shell);
    })
    .catch(function (err) {
      console.log(err);
    });
});