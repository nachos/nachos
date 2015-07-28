'use strict';

var fs = require('../fs');

module.exports.open = function (path, event) {
  return fs.openFile(path, event);
};