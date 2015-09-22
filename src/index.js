'use strict';

var app = require('app');
var nachosOpen = require('nachos-open');
var auth = require('./auth');
var server = require('./server');

server.start();

app.on('ready', function () {
  auth.isAuthenticated()
    .then(function (isAuthenticated) {
      if (isAuthenticated) {
        return nachosOpen('shell');
      }

      return auth.login()
        .then(function () {
          return nachosOpen('shell');
        });
    });
});