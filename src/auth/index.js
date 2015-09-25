'use strict';

var login = require('../client/login');
var nachosConfig = require('nachos-config');
var debug = require('debug')('nachos:auth');

var isAuthenticated = function () {
  return nachosConfig.get()
    .then(function (config) {
      return !!config.token;
    });
};

var promptLogin = function () {
  return login()
    .then(function (token) {
      debug('got token %s from login', token);

      return nachosConfig.set({ token: token });
    });
};

module.exports = {
  isAuthenticated: isAuthenticated,
  login: promptLogin
};