'use strict';

angular.module('chooseDefaultWindow', ['ngMaterial'])
  .config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('amber')
      .accentPalette('indigo');
  });