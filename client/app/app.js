'use strict';

angular.module('nachosApp', ['ngMaterial'])
  .run(function (fs, server, $mdDialog, switchApp, $timeout) {
    var gui = require('nw.gui');
    var keybindings = require('keybindings');
    var window = gui.Window.get();

    // Override the default alt tab behaviour
    // Create a shortcut with |option|.
    var shortcut = new gui.Shortcut({
      key : "Alt+Tab",
      active : function() {
      }
    });
    gui.App.registerGlobalHotKey(shortcut);

    shortcut = new gui.Shortcut({
      key : "Alt+Shift+Tab",
      active : function() {
      }
    });
    gui.App.registerGlobalHotKey(shortcut);

    new keybindings({
      key: 'f12',
      keydown: function () {
        window.showDevTools();
      }
    });

    server.start();
  });