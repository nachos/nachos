'use strict';

angular.module('nachosApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        controller: 'Login',
        templateUrl: 'app/login/login.html',
        data: {
          loginNotRequired: true,
          loggedInForbidden: true
        }
      });
  });
