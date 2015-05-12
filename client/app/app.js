'use strict';

angular.module('nachosApp', ['ngMaterial', 'ui.router', 'ngResource', 'ngCookies'])
  .config(function ($mdThemingProvider, $urlRouterProvider) {
    $urlRouterProvider
      .otherwise('/login');

    $mdThemingProvider.theme('default')
      .primaryPalette('light-blue')
      .accentPalette('orange');

    $mdThemingProvider.theme('login')
      .dark()
      .primaryColor('amber');
  })
  .run(function (Auth, $rootScope, $state) {

    $rootScope.$on('$stateChangeStart', function (event, next) {
      next.data = next.data || {};

      if(!next.data.loginNotRequired) {
        Auth.isLoggedInAsync(function (loggedIn) {
          if (loggedIn) {
            event.preventDefault();
            $state.go('explorer');
          } else {
            event.preventDefault();
            $state.go('login');
          }
        });
      }
      else if(next.data.loggedInForbidden) {
        Auth.isLoggedInAsync(function (loggedIn) {
          if (loggedIn) {
            event.preventDefault();
            $state.go('explorer');
          }
        });
      }
    });

    Auth.isLoggedInAsync(function (loggedIn) {
      if (loggedIn) {
        $state.go('explorer');
      } else {
        $state.go('login');
      }
    });
  });