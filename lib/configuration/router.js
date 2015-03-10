var express = require('express');
var controller = require('./controller');
var router = express.Router();

router.get('name', controller.getName);
router.get('email', controller.getEmail);

module.exports = router;