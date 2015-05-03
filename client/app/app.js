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
        window.focus();
      }
    });

    var isTabDialogOpen = false;

    function openDialog(){
      $mdDialog.show({
        controller: 'SwitchApp',
        templateUrl: 'app/switch-app/switch-app.html',
        clickOutsideToClose: false
      }).then(function (result) {

      });
      isTabDialogOpen = true;
    }

    function closeDialog(){
      isTabDialogOpen = false;
      $mdDialog.hide();
    }

    var ctrlTab = function (reverse) {
      $timeout(function () {
        if (!isTabDialogOpen) {
          openDialog();

          var ctrl = new keybindings({
            key: 'alt',
            keyup: function () {
              closeDialog();
              ctrl();
              switchApp.reset();
            }
          });
        }

        if (!reverse) {
          switchApp.next();
        } else {
          switchApp.previous();
        }
      });
    };

    new keybindings({
      key: 'alt+tab',
      keydown: function () {
        ctrlTab(false);
      }
    });

    new keybindings({
      key: 'alt+shift+tab',
      keydown: function () {
        ctrlTab(true);
      }
    });

    server.start();
  });