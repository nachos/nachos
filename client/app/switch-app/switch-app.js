'use strict';

angular.module('nachosApp')
  .controller('SwitchApp', function ($scope, $mdDialog, windows, switchApp) {
    $scope.apps = windows.windows;
    var numOfWindows = $scope.apps.length;


    $scope.selectedIndex = ((switchApp.index % numOfWindows) + numOfWindows) % numOfWindows;

    $scope.$on('switchAppIndexUpdated', function (ev, index) {
      $scope.selectedIndex = ((index % numOfWindows) + numOfWindows) % numOfWindows;
    });
  });