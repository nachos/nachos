'use strict';

angular.module('nachosApp')
  .service('defaults', function () {
    var nachosConfig = require('nachos-config')();

    this.setDefaultApp = function (ext, app, callback) {
      nachosConfig.get(function (err, config) {
        if (err) {
          return callback(err);
        }

        config.defaults.exts[ext] = app;
        nachosConfig.save(config, callback);
      });
    };

    this.getDefaultApp = function (ext, callback) {
      nachosConfig.get(function (err, config) {
        if (err) {
          return callback(err);
        }
        if (config.defaults && config.defaults.exts){
          return callback(null, config.defaults.exts[ext]);
        }

        callback();
      });
    };
  });