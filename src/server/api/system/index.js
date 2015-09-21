'use strict';

var express = require('express');
var controller = require('./system.controller');

var router = express.Router();

router.post('/open', controller.open);

module.exports = router;
