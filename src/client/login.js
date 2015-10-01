'use strict';

var app = require('app');
var path = require('path');
var Q = require('q');
var ipc = require('ipc');
var BrowserWindow = require('browser-window');

module.exports = function () {
  var deferred = Q.defer();

  var win = new BrowserWindow({
    title: 'Login screen',
    fullscreen: true,
    frame: false,
    type: 'desktop',
    'always-on-top': true,
    kiosk: true,
    'skip-taskbar': true,
    'web-preferences': {
      'web-security': false
    }
  });

  win.loadUrl('file://' + path.join(app.getAppPath(), './client/login/index.html'));

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