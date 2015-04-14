'use strict';

angular.module('nachosApp')
  .controller('SwitchApp', function ($scope, $mdDialog, windows, hotkeys) {
    $scope.windows = windows.windows;

    hotkeys.add({
      combo: 'tab',
      callback: function() {

      }
    });
  });