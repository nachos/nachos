'use strict';

angular.module('nachosApp')
  .service('switchApp', function($rootScope, $mdDialog, $timeout) {
    var isTabDialogOpen = false;

    function openDialog(){
      $mdDialog.show({
        controller: 'SwitchApp',
        templateUrl: 'app/switch-app/switch-app.html',
        clickOutsideToClose: false
      }).then(function (result) {
        isTabDialogOpen = false;
      });

      isTabDialogOpen = true;
    }

    this.findANameForThisFunction = function (reverse) {
      $timeout(function () {
        if (!isTabDialogOpen) {
          openDialog();
        }

        $rootScope.$broadcast('switchAppIndexUpdated', reverse);
      });
    };


  })
  .run(function (switchApp) {
    var gui = require('nw.gui');
    var keybindings = require('keybindings');

    new keybindings({
      key: 'alt+tab',
      keydown: function () {
        switchApp.findANameForThisFunction(false);
      }
    });

    new keybindings({
      key: 'alt+shift+tab',
      keydown: function () {
        switchApp.findANameForThisFunction(true);
      }
    });

    // Override the default alt tab behaviour
    // Create a shortcut with |option|.
    var shortcut = new gui.Shortcut({
      key : "Alt+Tab",
      active : function() {
      }
    });

    var shortcutShift = new gui.Shortcut({
      key : "Alt+Shift+Tab",
      active : function() {
      }
    });

    gui.App.registerGlobalHotKey(shortcut);
    gui.App.registerGlobalHotKey(shortcutShift);
  });