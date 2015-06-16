'use strict';

angular.module('nachosApp')
  .factory('systemRouter', function (system) {
    var express = require('express');

    return function () {
      var router = express.Router();

      router.post('/open', function (req, res) {
        system.open(req.body.path);
        res.json({});
      });

      return router;
    };
  });