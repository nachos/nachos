'use strict';

angular.module('nachosApp')
  .controller('SwitchApp', function ($scope, $mdDialog, windows, nativeApi) {
    var keybindings = require('keybindings');

    $scope.apps = windows.windows;
    var numOfWindows = $scope.apps.length;

    $scope.selectedIndex = 0;

    $scope.$on('switchAppIndexUpdated', function (ev, reverse) {
      if (reverse) {
        $scope.selectedIndex--;
      } else {
        $scope.selectedIndex++;
      }

      $scope.selectedIndex = (($scope.selectedIndex  % numOfWindows) + numOfWindows) % numOfWindows;
    });

    var ctrl = new keybindings({
      key: 'alt',
      keyup: function () {
        nativeApi.window.activate($scope.apps[$scope.selectedIndex].handle);
        $mdDialog.hide();
        ctrl();
      }
    });
  });