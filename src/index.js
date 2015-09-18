'use strict';

var app = require('app');
var auth = require('./auth');
var server = require('./server');
var nachosOpen = require('nachos-open');

server.start();

app.on('ready', function () {
  auth.isAuthenticated()
    .then(function (isAuthenticated) {
      if (isAuthenticated) {
        return nachosOpen('shell');
      }
      else {
        auth.login()
          .then(function () {
            return nachosOpen('shell');
          });
      }
    });
});

app.on('window-all-closed', function () {});