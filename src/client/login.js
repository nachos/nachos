'use strict';

var path = require('path');
var Q = require('q');
var ipc = require('ipc');
var BrowserWindow = require('browser-window');

module.exports = function () {
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

    win.hide();
  });

  return deferred.promise;
};