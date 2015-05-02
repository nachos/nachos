'use strict';

angular.module('nachosApp')
  .service('switchApp', function($rootScope) {
    this.index = 0;

    this.next = function () {
      this.index++;
      $rootScope.$broadcast('switchAppIndexUpdated',this.index);
    };

    this.previous = function () {
      this.index--;
      $rootScope.$broadcast('switchAppIndexUpdated',this.index);
    };
  });