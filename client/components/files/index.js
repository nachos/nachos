'use strict';

angular.module('nachosApp')
  .service('files', function($mdDialog) {
    var configuration = require('nachos-configuration');
    var path = require('path');
    var exec = require('child_process').execFile;

    var openWithApp = function (file, app) {
      exec(app, [file]);
    };

    this.open = function (file, event) {
      var ext = path.extname(file);

      configuration.defaults.getDefaultApp(ext, function (err, app) {
        if (app) {
          openWithApp(file, app);
        } else {
          $mdDialog.show({
            controller: 'ChooseDefault',
            templateUrl: 'app/choose-default/choose-default.html',
            targetEvent: event,
            locals: {
              ext: ext
            },
            clickOutsideToClose: false
          }).then(function (result) {
            console.log(result);
            if (result.always) {
              configuration.defaults.setDefaultApp(ext, result.app.name);
            }

            openWithApp(file, result.app);
          });
        }
      });
    };
  });