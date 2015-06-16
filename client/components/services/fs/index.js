'use strict';

angular.module('nachosApp')
  .service('fs', function ($mdDialog, defaults) {
    var native = require('native-api');
    var path = require('path');
    var exec = require('child_process').exec;

    var openWithApp = function (file, app) {
      app.command = app.command.replace(/\%\w/g, file);
      exec(app.command);
    };

    this.openFile = function (file, event) {
      var ext = path.extname(file);

      defaults.getDefaultApp(ext, function (err, app) {
        if (app) {
          openWithApp(file, app);
        } else {
          native.fileAssociation.getAppsThatCanOpenExtension(ext, function (err, apps) {
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
                defaults.setDefaultApp(ext, result.app.name);
              }

              openWithApp(file, result.app);
            });
          });
        }
      });
    };

    this.openFolder = function (folder, event) {

    }
  });