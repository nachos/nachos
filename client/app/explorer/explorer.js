'use strict';

angular.module('nachosApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('explorer', {
        url: '/explorer',
        controller: 'Explorer'
      });
  });
