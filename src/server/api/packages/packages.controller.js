'use strict';

var spawn = require('child-process-promise').spawn;
var packages = require('nachos-packages');
var Q = require('q');
var path = require('path');

var controller = {};

var _open = function (name, args) {
  args = args || [];

  return packages.getPackage(name)
    .then(function (pkg) {
      if (pkg.type !== 'burrito' && pkg.type !== 'taco') {
        return Q.reject('package must be taco or burrito');
      }

      if (pkg.type === 'burrito') {
        args.unshift(name);

        return _open('burrito', args);
      }

      spawn(path.join(pkg.path, pkg.config.name + '.exe'), args, {cwd: pkg.path});
    });
};

controller.open = function (req, res) {
  var name = req.body.name;
  var args = req.body.args;

  _open(name, args)
    .then(function () {
      res.status(200);
    })
    .catch(function (err) {
      res.status(400).json({message: err});
    });
};

module.exports = controller;