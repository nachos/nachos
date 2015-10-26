'use strict';

var app = require('app');
var path = require('path');
var Q = require('q');
var ipc = require('ipc');
var BrowserWindow = require('browser-window');

var LoginWindow = function () {
  var self = this;

  app.on('ready', function () {
    self._window = new BrowserWindow({
      title: 'Login screen',
      show: false,

      // Fullscreen: true, -> not working with show
      frame: false,
      'always-on-top': true,
      'skip-taskbar': true,
      'web-preferences': {
        'web-security': false
      }
    });
  });

  self._url = 'file://' + path.join(app.getAppPath(), './client/login/index.html');
};

LoginWindow.prototype.LoginWindow = LoginWindow;

LoginWindow.prototype.getToken = function () {
  return this._token || Q.reject('window never opened');
};

LoginWindow.prototype.open = function () {
  var self = this;

  self._window.loadUrl(self._url);

  self._window.webContents.on('did-finish-load', function () {
    self._window.show();
  });

  var deferred = Q.defer();

  ipc.on('login:success', function (event, token) {
    deferred.resolve(token);

    self.close();
  });

  self._token = deferred.promise;

  self._window.hide();
};

LoginWindow.prototype.close = function () {
  this._window.hide();
};

module.exports = new LoginWindow();