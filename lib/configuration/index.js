var _ = require('lodash');
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
var jsop = require('jsop');

var getDefaultConfig = function () {
  return {
    name: 'Omri Litov',
    email: 'omrilitov@gmail.com'
  }
};

var getAppDataPath = function () {
  // TODO: Implement appdata for linux
  return process.env[(process.platform == 'win32') ? 'APPDATA' : '?????????????'];
};

var getUserHome = function () {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
};

var getConfig = function (callback) {
  var configPath = path.join(getUserHome(), 'nachos.json');
  fs.exists(configPath, function (exists) {
    if (exists) {
      callback(null, jsop(configPath));
    } else {
      fs.writeFile(configPath, JSON.stringify(getDefaultConfig()), function (err) {
        if (err) callback(err);
        else callback(null, jsop(configPath));
      })
    }
  });
};

var getAppData = function (app, callback) {
  var appDataPath = path.join(getAppDataPath(), 'nachos', app);
  mkdirp(appDataPath, function (err) {
    if (err) callback(err);
    else callback(null, appDataPath);
  })
};

module.exports = {
  getConfig: getConfig,
  getAppData: getAppData
};