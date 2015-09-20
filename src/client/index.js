'use strict';

var ipc = require('ipc');
var BrowserWindow = require('browser-window');
var path = require('path');
var Q = require('q');

var login = function () {
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

var chooseDefault = function () {
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

  return deferred.promise;
};

module.exports = {
  login: login,
  chooseDefault: chooseDefault
};