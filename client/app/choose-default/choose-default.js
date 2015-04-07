'use strict';

angular.module('nachosApp')
  .controller('ChooseDefault', function ($scope, $mdDialog, ext, $timeout) {
    var native = require('native-api');

    native.fileAssociation.getAppsThatCanOpenExtension(ext, function (err, apps) {
      $timeout(function () {
        $scope.apps = apps;
      });
    });

    $scope.ext = ext;
    $scope.always = false;

    $scope.ok = function () {
      $mdDialog.hide({ app: 'asdasd', always: $scope.always });
    }
  });