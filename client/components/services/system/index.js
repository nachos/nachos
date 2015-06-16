'use strict';

angular.module('nachosApp')
  .service('system', function (fs) {
    this.open = function (path, event) {
      fs.openFile(path, event);
    };
  });