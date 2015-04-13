'use strict';

angular.module('nachosApp')
  .factory('fsRouter', function (fs) {
    var express = require('express');

    return function () {
      var router = express.Router();

      router.post('/open', function (req, res) {
        fs.open(req.body.path);
        res.json({});
      });

      return router;
    };
  });