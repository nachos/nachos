'use strict';

angular.module('nachosApp')
  .factory('userRouter', function (User) {
    var express = require('express');

    return function () {
      var router = express.Router();

      router.get('/me', function (req, res) {
        User.get().$promise.then(function (data) {
          res.status(200).json(data);
        }).catch(function (err) {
          res.status(500).json(err);
        });
      });

      return router;
    };
  });