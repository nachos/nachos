'use strict';

var express = require('express');
var packages = require('../../../services').packages;

module.exports = function () {
  var router = express.Router();

  console.log('asdfasfasf');
  router.post('/open', function (req, res) {
    console.log('asdf');
    packages.open(req.body.name, req.body.args);
    res.json({});
  });

  return router;
};

/* A
'use strict';

var express = require('express');
var controller = require('./packages.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:name', controller.show);
router.post('/', auth.hasPermissions('write_packages'), controller.create);
router.put('/:name', auth.hasPermissions('write_packages'), controller.update);
router.delete('/:name', auth.hasPermissions('write_packages'), controller.destroy);

module.exports = router;*/