'use strict';

var app = require('app');
var path = require('path');
var Q = require('q');
var ipc = require('ipc');
var BrowserWindow = require('browser-window');

var ChooseDefault = function () {
  var self = this;

  app.on('ready', function () {
    self._window = new BrowserWindow({
      title: 'Choose default application',
      transparent: true,
      frame: false,
      'skip-taskbar': true,
      'always-on-top': true,
      'use-content-size': true,
      'web-preferences': {
        'web-security': false
      },
      show: false
    });
  });

  self._url = 'file://' + path.join(app.getAppPath(), './client/choose-default/index.html');
};

ChooseDefault.prototype.ChooseDefault = ChooseDefault;

ChooseDefault.prototype.getDefaultApp = function () {
  return this._app || Q.reject('window never opened');
};

ChooseDefault.prototype.open = function (ext) {
  var self = this;

  self._window.loadUrl(self._url);

  self._window.webContents.on('did-finish-load', function () {
    self._window.show();

    self._window.webContents.send('chooseDefault:extension', ext);
  });

  var deferred = Q.defer();

  self._window.on('blur', function () {
    self.close();
  });

  ipc.on('chooseDefault:selected', function (event, options) {
    deferred.resolve(options);

    self.close();
  });

  self._app = deferred.promise;
};

ChooseDefault.prototype.close = function () {
  this._window.hide();
};

module.exports = new ChooseDefault();