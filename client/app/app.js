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
  .run(function ($state) {
    var serverApi = require('nachos-server-api');
    var client = serverApi();

    if (client.connected()) {
      $state.go('explorer');
    } else {
      $state.go('login');
    }
  });