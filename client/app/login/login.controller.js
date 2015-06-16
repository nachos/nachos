'use strict';

angular.module('nachosApp')
  .controller('Login', function ($scope, $state, $timeout) {
    var serverApi = require('nachos-server-api');
    var client = serverApi();

    $scope.login = function () {
      client.connect($scope.user, function (err, response) {
        $timeout(function () {
          if (err || !response) {
            $scope.error = err;
          } else {
            $state.go('explorer');
          }
        });
      });
    };

    $scope.user = {
      email: 'nacho@gmail.com',
      password: 'nacho'
    }
  });