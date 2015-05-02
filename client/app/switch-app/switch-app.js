'use strict';

angular.module('nachosApp')
  .controller('SwitchApp', function ($scope, $mdDialog, windows, switchApp) {
    $scope.windows = windows.windows;
    var numOfWindows = $scope.windows.length;


    $scope.selectedIndex = ((switchApp.index % numOfWindows) + numOfWindows) % numOfWindows;;

    $scope.$on('switchAppIndexUpdated', function (ev, index) {
      $scope.selectedIndex = ((index % numOfWindows) + numOfWindows) % numOfWindows;;
    })
  });