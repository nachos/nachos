'use strict';

angular.module('chooseDefaultWindow')
  .controller('main', function ($mdDialog) {
    var ipc = require('ipc');
    var fileAssociation = require('file-association');

    ipc.on('chooseDefault:extension', function (ext) {
      fileAssociation.getAppsThatCanOpenExtension(ext)
        .then(function (apps) {
          return $mdDialog.show({
            controller: 'chooseDefault',
            templateUrl: 'app/dialog/dialog.html',
            clickOutsideToClose: false,
            hasBackdrop: false,
            locals: {
              apps: apps
            }
          });
        })
        .then(function (app) {
          ipc.send('chooseDefault:selected', app);
        });
    });
  });