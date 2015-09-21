'use strict';

var path = require('path');
var Q = require('q');
var ipc = require('ipc');
var BrowserWindow = require('browser-window');

module.exports = function (ext) {
  var deferred = Q.defer();

  var win = new BrowserWindow({
    transparent: true,
    frame: false,
    'use-content-size': true,
    'web-preferences': {
      'web-security': false
    }
  });

  win.loadUrl('file://' + path.resolve('./client/choose-default/index.html'));

  win.webContents.on('did-finish-load', function () {
    win.show();
  });

  win.on('closed', function () {
    win = null;
  });

  win.on('blur', function () {
    win.hide();
  });

  ipc.send('chooseDefault:choose', ext);
  ipc.on('chooseDefault:selected', function (event, app) {
    deferred.resolve(app);
    win.close();
  });

  return deferred.promise;
};