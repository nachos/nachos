'use strict';

angular.module('nachosApp')
  .service('fs', function ($mdDialog) {
    var configuration = require('nachos-configuration');
    var native = require('native-api');
    var path = require('path');
    var exec = require('child_process').exec;
    var nachosSettings = configuration.settings('nachos');

    var setDefaultApp = function (ext, app, callback) {
      nachosSettings.get(function (err, config) {
        if (err) {
          return callback(err);
        }

        config.defaults.exts[ext] = app;
        nachosSettings.save(config, callback);
      });
    };

    var getDefaultApp = function (ext, callback) {
      nachosSettings.get(function (err, config) {
        if (err) {
          return callback(err);
        }

        return callback(null, config.defaults.exts[ext]);
      });
    };

    var openWithApp = function (file, app) {
      app.command = app.command.replace(/\%\w/g, file);
      exec(app.command);
    };

    this.open = function (file, event) {
      var ext = path.extname(file);

      getDefaultApp(ext, function (err, app) {
        if (app) {
          openWithApp(file, app);
        } else {
          native.fileAssociation.getAppsThatCanOpenExtension(ext, function (err, apps) {
            if (apps.length === 1) {
              openWithApp(file, apps[0]);
            }
            else {
              $mdDialog.show({
                controller: 'ChooseDefault',
                templateUrl: 'app/explorer/choose-default/choose-default.html',
                targetEvent: event,
                locals: {
                  apps: apps
                },
                clickOutsideToClose: false
              }).then(function (result) {
                if (result.always) {
                  setDefaultApp(ext, result.app.name);
                }

                openWithApp(file, result.app);
              });
            }
          });
        }
      });
    };
  });