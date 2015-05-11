'use strict';

angular.module('nachosApp')
  .factory('userRouter', function () {
    var express = require('express');

    return function () {
      var router = express.Router();

      router.get('/me', function (req, res) {
        res.json({ name: 'hi'});
      });

      return router;
    };
  });