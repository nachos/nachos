'use strict';

var spawn = require('child-process-promise').spawn;
var packages = require('nachos-packages');
var Q = require('q');
var path = require('path');

var open = function (name, args) {
  args = args || [];

  return packages.getPackage(name)
    .then(function (pkg) {
      if (pkg.type !== 'burrito' && pkg.type !== 'taco') {
        return Q.reject('package must be taco or burrito');
      }

      if (pkg.type === 'burrito') {
        args.unshift(name);
        return open('burrito', args);
      }

      spawn(path.join(pkg.path, pkg.config.name + '.exe'), args, {cwd: pkg.path});
    });
};

module.exports = {
  open: open
};