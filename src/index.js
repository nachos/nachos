'use strict';

var app = require('app');
var auth = require('./auth');
var server = require('./server');
var packages = require('./services/packages');

server.start();

app.on('ready', function () {
  auth.isAuthenticated()
    .then(function (isAuthenticated) {
      if (isAuthenticated) {
        return packages.open('shell');
      }
      else {
        auth.login()
          .then(function () {
            return packages.open('shell');
          });
      }
    });
});

app.on('window-all-closed', function () {});