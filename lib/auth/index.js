'use strict';

var client = require('../client');
var nachosConfig = require('nachos-config');

module.exports.isAuthenticated = function () {
  return nachosConfig.get()
    .then(function (config) {
      return !!config.token;
    });
};

module.exports.login = function () {
  return client.login()
    .then(function (token) {
      return nachosConfig.set({ token: token });
    });
};