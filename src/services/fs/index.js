'use strict';

//var native = require('native-api');
var path = require('path');
var exec = require('child_process').exec;

var openWithApp = function (file, app) {
  app.command = app.command.replace(/\%\w/g, file);
  exec(app.command);
};

module.exports.openFile = function (file) {
  var ext = path.extname(file);

  return defaults.getDefaultApp(ext).then(function (app) {
    if (app) {
      openWithApp(file, app);
    } else {
      console.log('choose an app');

      /*native.fileAssociation.getAppsThatCanOpenExtension(ext, function (err, apps) {
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
      });*/
    }
  });
};

module.exports.openFolder = function (folder, event) {

};