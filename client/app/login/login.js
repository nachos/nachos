'use strict';

angular.module('nachosApp')
  .config(function ($stateProvider, $mdThemingProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        controller: 'Login',
        templateUrl: 'app/login/login.html'
      });

    $mdThemingProvider.theme('facebook')
      .primaryColor('indigo');

    $mdThemingProvider.theme('google')
      .primaryColor('red');
  });
