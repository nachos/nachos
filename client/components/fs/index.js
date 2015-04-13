'use strict';

angular.module('nachosApp')
  .service('fs', function($mdDialog) {
    var configuration = require('nachos-configuration');
    var native = require('native-api');
    var path = require('path');
    var exec = require('child_process').exec;

    var openWithApp = function (file, app) {
      app.command = app.command.replace(/\%\w/g, file);
      exec(app.command);
    };

    this.open = function (file, event) {
      var ext = path.extname(file);

      configuration.defaults.getDefaultApp(ext, function (err, app) {
        if (app) {
          openWithApp(file, app);
        } else {
          native.fileAssociation.getAppsThatCanOpenExtension(ext, function (err, apps) {
            if(apps.length === 1){
              openWithApp(file, apps[0]);
            }
            else{
              $mdDialog.show({
                controller: 'ChooseDefault',
                templateUrl: 'app/choose-default/choose-default.html',
                targetEvent: event,
                locals: {
                  apps: apps
                },
                clickOutsideToClose: false
              }).then(function (result) {
                if (result.always) {
                  configuration.defaults.setDefaultApp(ext, result.app.name);
                }

                openWithApp(file, result.app);
              });
            }
          });
        }
      });
    };
  });