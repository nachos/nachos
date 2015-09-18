'use strict';

angular.module('loginWindow', ['ngMaterial'])
  .config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .dark()
      .primaryPalette('amber');
  });