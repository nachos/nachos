'use strict';

var nachosConfig = require('nachos-config');
var Q = require('q');

module.exports.setDefaultApp = function (ext, app) {
  return nachosConfig.get().then(function (config) {
    config.defaults.exts[ext] = app;

    return nachosConfig.save(config);
  });
};

module.exports.getDefaultApp = function (ext) {
  return nachosConfig.get().then(function (config) {
    if (config.defaults && config.defaults.exts) {
      return config.defaults.exts[ext];
    }

    return null;
  });
};