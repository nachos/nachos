'use strict';

angular.module('nachosApp')
  .service('nativeApi', function() {
    return require('native-api');
  });