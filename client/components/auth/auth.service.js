'use strict';

angular.module('nachosApp')
  .factory('Auth', function Auth($location, $rootScope, $http, User, $cookies, $q) {
    var currentUser = {};
    if ($cookies.token) {
      currentUser = User.get();
    }

    var BASE_URL = 'http://localhost:1337';

    return {

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      login: function (user, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.post(BASE_URL + '/auth/local', {
          email: user.email,
          password: user.password
        }).
          success(function (data) {
            $cookies.token = data.token;
            currentUser = User.get();
            deferred.resolve(data);
            return cb();
          }).
          error(function (err) {
            this.logout();
            deferred.reject(err);
            return cb(err);
          }.bind(this));

        return deferred.promise;
      },

      /**
       * Delete access token and user info
       *
       * @param  {Function}
       */
      logout: function () {
        delete $cookies.token;
        currentUser = {};
      },

      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      createUser: function (user, callback) {
        var cb = callback || angular.noop;

        return User.save(user,
          function (data) {
            $cookies.token = data.token;
            currentUser = User.get();
            return cb(user);
          },
          function (err) {
            this.logout();
            return cb(err);
          }.bind(this)).$promise;
      },

      /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional
       * @return {Promise}
       */
      changePassword: function (oldPassword, newPassword, callback) {
        var cb = callback || angular.noop;

        return User.changePassword({id: currentUser._id}, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function (user) {
          return cb(user);
        }, function (err) {
          return cb(err);
        }).$promise;
      },

      /**
       * Gets all available info on authenticated user
       *
       * @return {Object} user
       */
      getCurrentUser: function () {
        return currentUser;
      },

      /**
       * Refresh all available info on authenticated user
       *
       * @return {Promise}
       */
      refreshCurrentUser: function () {
        if (currentUser) {
          return User.get()
            .$promise
            .then(function (user) {
              return _.assign(currentUser, user);
            });
        }

        return $q.reject('No user to refresh');
      },

      /**
       * Check if a user is logged in
       *
       * @return {Boolean}
       */
      isLoggedIn: function () {
        return currentUser.hasOwnProperty('_id');
      },

      /**
       * Waits for currentUser to resolve before checking if user is logged in
       */
      isLoggedInAsync: function (cb) {
        if (currentUser.hasOwnProperty('$promise')) {
          currentUser.$promise.then(function () {
            cb(true);
          }).catch(function () {
            cb(false);
          });
        } else {
          cb(currentUser.hasOwnProperty('_id'));
        }
      },

      /**
       * Get auth token
       */
      getToken: function () {
        return $cookies.token;
      },

      hasPermissions: function (permissions) {
        if (!currentUser) {
          return false;
        }

        return _.isEmpty(_.difference(permissions, _.flatten(currentUser.roles, 'permissions')));
      },

      /**
       * Disconnect social provider
       *
       * @param {String} provider
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      disconnectSocial: function (provider, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();
        // TODO: update local user info

        // TODO: why the fuck do we log out on error
        $http.post(BASE_URL + '/auth/' + provider + '/disconnect').
          success(function () {
            deferred.resolve();
            return cb();
          }).
          error(function (err) {
            this.logout();
            deferred.reject(err);
            return cb(err);
          }.bind(this));

        return deferred.promise;
      }
    };
  });
