'use strict';

var runElectron = require('gulp-run-electron');
var packager = require('electron-packager');
var path = require('path');

var config = require('../config');

module.exports = function (gulp) {
  gulp.task('electron:run', function () {
    return gulp.src(config.paths.electron)
      .pipe(runElectron());
  });

  gulp.task('electron:build', ['build'], function (cb) {
    var dir = process.cwd();
    var nachosJson = require(path.join(dir, 'nachos.json'));

    var opts = {
      dir: dir,
      name: nachosJson.name,
      platform: 'all',
      arch: 'all',
      version: '0.33.1',
      out: 'dist',
      ignore: ['/node_modules($|/)', '/dist($|/)']
    };

    packager(opts, function (err, appPath) {
      console.log(err || appPath);
      cb();
    });
  });
};
