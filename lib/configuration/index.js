var _ = require('lodash');
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');

var system = require('./system');

system.create(function (err) {
  var basePath = system.getBasePath();

});







module.exports = function () {


  var configs = {};

  mkdirp(resolvedBasePath, function (err) {
    _.each(['users', 'system', 'programs'], function (folder) {
      var folderPath = path.join(resolvedBasePath, folder);

      mkdirp(folderPath, function (err) {
        configs[folder] = require('./' + folder)(folderPath);
      });
    });
  });

  return {
    getUsersConfig: function () {
      return configs.users;
    },
    getSystemConfig: function () {
      return configs.system;
    },
    getProgramsConfig: function () {
      return configs.programs;
    }
  };
};