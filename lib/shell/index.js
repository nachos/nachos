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
  var shellWindow = null;

  var pathToShell = path.resolve('./node_modules/shell-taco/client/index.html');

  shellWindow = new BrowserWindow({
    fullscreen: true,
    frame: false,
    type: 'desktop',
    'web-preferences': {
      'web-security': false
    }
  });

  // and load the index.html of the app.
  shellWindow.loadUrl('file://' + pathToShell);

  shellWindow.on('closed', function () {
    shellWindow = null;

    if (process.platform != 'darwin') {
      app.quit();
    }
  });
};

this.stop = function () {

};