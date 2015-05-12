'use strict';

angular.module('nachosApp')
  .controller('Login', function ($scope, $state, Auth) {

    $scope.login = function () {
      Auth.login($scope.user, function (err, response) {
        if (err) {
          $scope.error = err;
        } else {
          $state.go('explorer');
        }
      });
    }
  });