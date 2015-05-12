'use strict';

angular.module('nachosApp')
  .controller('Explorer', function ($scope, fs, server, shell) {
    var gui = require('nw.gui');
    var keybindings = require('keybindings');
    var window = gui.Window.get();

    var f12 = new keybindings({
      key: 'f12',
      keydown: function () {
        window.showDevTools();
      }
    });

    server.start();
    shell.start();

    /*$scope.on('$destroy', function () {
      server.stop();
      shell.stop();
      f12();
    })*/
  });