'use strict';

var path = require('path');
var exec = require('child-process-promise').exec;
var nachosConfig = require('nachos-config');

var chooseDefault = require('../../../client/choose-default');

var controller = {};

/**
 * Opens app by command
 *
 * @param {string} file File to open
 * @param {string} app The app the open with
 * @returns {Q.promise} Finished exec
 */
var openWithApp = function (file, app) {
  return exec(app.command.replace(/\%\w/g, file));
};

/**
 * Opens file
 *
 * @param {Object} req Request
 * @param {Object} res Response
 */
controller.open = function (req, res) {
  var ext = path.extname(req.body.path);

  nachosConfig.getDefaultApp(ext)
    .then(function (app) {
      if (app) {
        return openWithApp(req.body.path, app);
      }

      chooseDefault.open();

      return chooseDefault.getDefaultApp(ext);
    })
    .then(function (options) {
      return openWithApp(req.body.path, options.app)
        .then(function () {
          if (options.always) {
            return nachosConfig.setDefaultApp(ext, options.app);
          }
        });
    })
    .catch(function (err) {
      console.log(err);
    });

  res.end();
};

module.exports = controller;