'use strict';

var express = require('express');
var system = require('../../../services').system;

module.exports = function () {
  var router = express.Router();

  router.post('/open', function (req, res) {
    system.open(req.body.path);
    res.json({});
  });

  return router;
};
