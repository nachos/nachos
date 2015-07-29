'use strict';

var nachosConfig = require('nachos-config');
var exec = require('child_process').exec;
var path = require('path');
//var screen = require('native-api').screen;
var _ = require('lodash');
var app = require('app');
var BrowserWindow = require('browser-window');
var debug = require('debug')('nachosCore');
var url = require('url');

this.start = function () {
  var mainWindow = null;

  var pathToShell = path.resolve('./node_modules/shell-taco/client/index.html');

  app.on('ready', function () {
    mainWindow = new BrowserWindow({
      fullscreen: true,
      frame: false,
      type: 'desktop',
      'web-preferences': {
        'web-security': false
      }
    });

    debug(pathToShell);

    // and load the index.html of the app.
    mainWindow.loadUrl('file://' + pathToShell);

    mainWindow.on('closed', function () {
      mainWindow = null;
    });
  });

  app.on('window-all-closed', function () {
    if (process.platform != 'darwin') {
      app.quit();
    }
  });
};

this.stop = function () {

};