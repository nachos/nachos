'use strict';

var ipc = require('ipc');
var BrowserWindow = require('browser-window');
var path = require('path');
var Q = require('q');

module.exports.login = function () {
  var deferred = Q.defer();

  var win = new BrowserWindow({
    fullscreen: true,
    frame: false,
    type: 'desktop',
    'web-preferences': {
      'web-security': false
    }
  });

  win.loadUrl('file://' + path.resolve('./client/login/index.html'));

  win.webContents.on('did-finish-load', function () {
    win.show();
  });

  win.on('closed', function () {
    win = null;
  });

  ipc.on('login:success', function (event, token) {
    deferred.resolve(token);
    win.close();
  });

  return deferred.promise;
};