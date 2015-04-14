'use strict';

angular.module('nachosApp', ['ngMaterial', 'cfp.hotkeys'])
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
    gui.App.registerGlobalHotKey(new gui.Shortcut({
      key: "Ctrl+Shift+F12",
      active: function () {
        gui.Window.get().showDevTools();
      },
      failed: function (msg) {
        // :(, fail to register the |key| or couldn't parse the |key|.
        console.log(msg);
      }
    }));

    gui.App.registerGlobalHotKey(new gui.Shortcut({
      key: "Ctrl+Tab",
      active: function () {
        $mdDialog.show({
          controller: 'SwitchApp',
          templateUrl: 'app/switch-app/switch-app.html',
          clickOutsideToClose: false
        }).then(function (result) {

        });
      },
      failed: function (msg) {
        // :(, fail to register the |key| or couldn't parse the |key|.
        console.log(msg);
      }
    }));

    //files.open("E:\\a\\_Afrojack_-_Rock_The_House_Original_Mix_.mp3");
  });