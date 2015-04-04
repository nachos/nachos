'use strict';

angular.module('nachosApp')
  .service('files', function() {
    var configuration = require('nachos-configuration');
    var path = require('path');
    var exec = require('child_process').execFile;
    var gui = require('nw.gui');

    this.open = function (file) {
      var ext = path.extname(file);

      configuration.defaults.getDefaultApp(ext, function (err, app) {
        if (app) {
          exec(app, [file]);
        } else {
          var win = gui.Window.open('app/choose-default/choose-default.html', {
            'position': 'center',
            'always-on-top': true
          });

          win.on('close', function () {
            if (win.window.result && win.window.result.app) {
              if (win.window.result && win.window.result.always) {
                configuration.defaults.setDefaultApp(ext, win.window.result.app);
              }

              exec(win.window.result.app, [file]);
            }

            this.close(true);
          });
        }
      });
    };
  });