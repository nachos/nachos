'use strict';

angular.module('chooseDefaultWindow')
  .controller('chooseDefault', function ($scope, $mdDialog, apps) {
    $scope.apps = apps;
    $scope.always = false;

    $scope.ok = function () {
      $mdDialog.hide({
        app: $scope.selectedApp,
        always: $scope.always
      });
    };

    $scope.selectItem = function (item) {
      if ($scope.selectedItem !== item) {
        $scope.selectedItem = item;
      }
    };
  });