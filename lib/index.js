'use strict';

var app = require('app');
var auth = require('./auth');
var server = require('./server');
var shell = require('./shell');
var settings = require('./services/settings');

settings.open('selfie');
server.start();

app.on('ready', function () {

  //auth.isAuthenticated()
  //  .then(function (isAuthenticated) {
  //    if (isAuthenticated) {
  //      shell.start();
  //    }
  //    else {
  //      auth.login()
  //        .then(function () {
  //          shell.start();
  //        });
  //    }
  //  });
});

app.on('window-all-closed', function () {

});