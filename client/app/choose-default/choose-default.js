'use strict';

angular.module('defaultApp', ['ngMaterial'])
  .controller('Main', function ($scope) {
    var native = require('native-api');

    $scope.apps = ['asd', 'asd2', 'asdasd3'];

    window.result = {
      app: 'C:\\Program Files\\WinRAR\\WinRAR.exe'
    };
  });