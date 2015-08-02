'use strict';

angular.module('nachosApp', ['ngMaterial', 'ui.router', 'ngResource', 'ngCookies'])
  .config(function ($mdThemingProvider, $urlRouterProvider) {
    $urlRouterProvider
      .otherwise('/explorer');

    $mdThemingProvider.theme('default')
      .primaryPalette('light-blue')
      .accentPalette('orange');

    $mdThemingProvider.theme('login')
      .dark()
      .primaryColor('amber');
  });