'use strict';

var path = require('path');
var exec = require('child_process').exec;
var defaults = require('../../../services/defaults');
var chooseDefault = require('../../../client/choose-default');

var controller = {};

var openWithApp = function (file, app) {
  app.command = app.command.replace(/\%\w/g, file);
  exec(app.command);
};

controller.open = function (req, res) {
  var ext = path.extname(req.body.path);

  defaults.getDefaultApp(ext)
    .then(function (app) {
      if (app) {
        return openWithApp(req.body.path, app);
      }

      return chooseDefault(ext)
        .then(function (app) {
          openWithApp(req.body.path, app);
        });
    });

  res.end();
};

module.exports = controller;