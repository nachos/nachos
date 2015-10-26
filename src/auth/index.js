'use strict';

var nachosConfig = require('nachos-config');
var debug = require('debug')('nachos:auth');
var login = require('../client/login');

/**
 * Checks if the user already logged in
 *
 * @returns {Q.promise} Boolean of the user login status
 */
var isAuthenticated = function () {
  return nachosConfig.get()
    .then(function (config) {
      return !!config.token;
    });
};

/**
 * Prompts login window
 *
 * @returns {Q.promise} Promise of the saved token after login
 */
var promptLogin = function () {
  login.open();

  return login.getToken()
    .then(function (token) {
      debug('got token %s from login', token);

      return nachosConfig.set({ token: token });
    });
};

module.exports = {
  isAuthenticated: isAuthenticated,
  login: promptLogin
};