'use strict';

angular.module('nachosApp', ['ngMaterial'])
  .run(function (fs, server, $mdDialog, switchApp) {
    var gui = require('nw.gui');
    var keybindings = require('keybindings');
    var window = gui.Window.get();

    new keybindings({
      key: 'f12',
      keydown: function () {
        window.showDevTools();
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
    new keybindings({
      key: 'ctrl+tab',
      keydown: function () {
        if (!isTabDialogOpen) {
          openDialog();
        }

        switchApp.next();
      },
      keyup: function () {
        closeDialog();
      }
    });

    new keybindings({
      key: 'ctrl+shift+tab',
      keydown: function () {
        if (!isTabDialogOpen) {
          openDialog();
        }

        switchApp.previous();
      },
      keyup: function () {
        closeDialog();
      }
    });

    server.start();
  });