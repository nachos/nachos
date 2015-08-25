'use strict';

var runElectron = require('gulp-run-electron');
var config = require('../config');

module.exports = function (gulp) {
  gulp.task('electron', function () {
    return gulp.src(config.paths.electron)
      .pipe(runElectron());
  });
};
