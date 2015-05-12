'use strict';

angular.module('nachosApp')
  .factory('authInterceptor', function ($q, $cookies, $injector) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookies.token) {
          config.headers.Authorization = 'Bearer ' + $cookies.token;
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function (response) {
        if (response.status === 401) {
          $injector.get('$state').go('login');

          // remove any stale tokens
          delete $cookies.token;
        }
        else if (response.status === 403) {
          $injector.get('$state').go('explorer');
        }

        return $q.reject(response);
      }
    };
  })
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });