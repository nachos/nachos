'use strict';

var spawn = require('child-process-promise').spawn;
var path = require('path');

module.exports = {
  open: function (name, args) {
    var packages = require('nachos-packages');

    var burrito = 'burrito';

    packages.getTaco(burrito)
      .then(function (taco) {
        spawn(path.join(taco.path, burrito +  '.exe'), ['settings', name], {cwd: taco.path})
      });
  }
};