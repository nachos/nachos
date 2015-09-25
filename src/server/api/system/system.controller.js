'use strict';

var path = require('path');
var exec = require('child_process').exec;
var nachosConfig = require('nachos-config');

var chooseDefault = require('../../../client/choose-default');

var controller = {};

var openWithApp = function (file, app) {
  return exec(app.command.replace(/\%\w/g, file));
};

controller.open = function (req, res) {
  var ext = path.extname(req.body.path);

  nachosConfig.getDefaultApp(ext)
    .then(function (app) {
      if (app) {
        return openWithApp(req.body.path, app);
      }

      return chooseDefault(ext)
        .then(function (options) {
          if (options.always) {
            nachosConfig.setDefaultApp(ext, options.app)
              .catch(function (err) {
                console.log(err);
              });
          }

          return openWithApp(req.body.path, options.app);
        });
    })
    .catch(function (err) {
      console.log(err);
    });

  res.end();
};

module.exports = controller;