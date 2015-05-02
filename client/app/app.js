'use strict';

angular.module('nachosApp', ['ngMaterial'])
  .run(function (fs, server) {
    //fs.open("E:\\a\\_Afrojack_-_Rock_The_House_Original_Mix_.mp3");
    var gui = require('nw.gui');
    var keybindings = require('keybindings');
    var window = gui.Window.get();

    new keybindings({
      key: 'f12',
      keydown: function () {
        window.showDevTools();
      }
    });

    server.start();
  });