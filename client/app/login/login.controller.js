'use strict';

angular.module('nachosApp')
  .controller('Login', function ($scope) {
    var serverApi = require('nachos-server-api');
    var ipc = require('ipc');
    var client = serverApi();

    $scope.login = function () {
      client.connect($scope.user)
        .then(function (response) {
          ipc.send('login:success', response);
        });
    };

    $scope.loginSocial = function (social) {
      /*client.connect($scope.user)
        .then(function (response) {
          ipc.send('login:success', response);
        });*/
    };

    $scope.user = {
      email: 'nacho@gmail.com',
      password: 'nacho'
    }
  });