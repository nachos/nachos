'use strict';

var packager = require('electron-packager');
var path = require('path');
var es = require('event-stream');
var runElectron = require('gulp-run-electron');
var jeditor = require('gulp-json-editor');

var config = require('../config');

module.exports = function (gulp) {
  gulp.task('electron:run', function () {
    return gulp.src(config.paths.electron)
      .pipe(runElectron());
  });

  gulp.task('electron:build', function (cb) {
    var dir = process.cwd();
    var nachosJson = require(path.join(dir, 'nachos.json'));

    var opts = {
      dir: path.join(dir, '.tmp'),
      name: nachosJson.name,
      all: true,
      version: '0.33.1',
      overwrite: true,
      out: 'dist',
      icon: path.join(dir, 'favicon.ico'),
      'version-string': {
        CompanyName: 'Nachos',
        LegalCopyright: 'GNUGPLv2',
        FileDescription: nachosJson.name,
        OriginalFilename: nachosJson.name,
        FileVersion: nachosJson.version,
        ProductVersion: nachosJson.version,
        ProductName: nachosJson.name,
        InternalName: nachosJson.name
      }
    };

    packager(opts, function (err, apps) {
      if (err) {
        return cb(err);
      }

      var streams = apps.map(function (app) {
        var main = './' + nachosJson.name + (app.indexOf('win32') !== -1 ? '.exe' : '');

        return gulp.src(path.join(dir, app, 'resources', 'app', 'nachos.json'))
          .pipe(jeditor({
            main: main
          }))
          .pipe(gulp.dest(path.join(dir, app)));
      });

      es.merge(streams).on('end', cb);
    });
  });
};
