var _ = require('lodash');
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');

var basePath = path.resolve('C:\\nachos');
var systemPath = path.join(basePath, 'system');

module.exports = {
  getBasePath: function () {
    return basePath;
  }
};