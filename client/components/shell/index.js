'use strict';

angular.module('nachosApp')
  .run(function() {
    var configuration = require('nachos-configuration');
    var exec = require('child_process').exec;
    var path = require('path');
    var screen = require('native-api').screen;
    var _ = require('lodash');

    configuration.configs.get(function (err, file) {
      if (err) return console.log(err);

      var pathToShell = path.resolve('./../node_modules/nachos-shell/client');
      var commandToRun = file.shell || 'nw ' + pathToShell;
      console.log('Starting shell: ' + commandToRun);

      //var json = require('./../node_modules/nachos-shell/client/package.json');
      //gui.Window.open('./../node_modules/nachos-shell/client/index.html', json.window);

      exec(commandToRun, function (err) {
        if (err) return console.log(err);
      });

      _.forEach(screen.getAllScreens(), function (screen) {
        /*exec(commandToRun + ' ' + screen.handle, function (err) {
         if (err) return console.log(err);
         })*/
      });
    });
  });