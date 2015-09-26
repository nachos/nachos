'use strict';

var packager = require('electron-packager');
var path = require('path');
var Q = require('q');
var es = require('event-stream');
var runElectron = require('gulp-run-electron');
var jeditor = require('gulp-json-editor');

var config = require('../config');

module.exports = function (gulp) {
  gulp.task('electron:run', function () {
    return gulp.src(config.paths.electron)
      .pipe(runElectron());
  });

  gulp.task('electron:build', function () {
    var dir = process.cwd();
    var nachosJson = require(path.join(dir, 'nachos.json'));

    var opts = {
      dir: path.join(dir, '.tmp'),
      name: nachosJson.name,
      all: true,
      version: '0.33.1',
      overwrite: true,
      out: 'dist',
      icon: path.join(dir, 'favicon.ico')
    };

    return Q.nfcall(packager, opts)
      .then(function (apps) {
        var streams = apps.map(function (app) {
          var cwd = path.join(dir, app, 'resources', 'app');

          var main = './' + nachosJson.name;

          main += app.indexOf('win32') !== -1 ? '.exe' : '';

          return gulp.src(path.join(cwd, 'nachos.json'))
            .pipe(jeditor({
              main: main
            }))
            .pipe(gulp.dest(path.join(dir, app)));
        });

        return es.merge(streams);
      });
  });
};
