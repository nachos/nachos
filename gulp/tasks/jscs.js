'use strict';

var jscs = require('gulp-jscs');
var config = require('../config');

module.exports = function (gulp) {
  gulp.task('jscs', ['jscs:src', 'jscs:test', 'jscs:gulp']);

  gulp.task('jscs:src', function () {
    return gulp.src(config.paths.src)
      .pipe(jscs());
  });

  gulp.task('jscs:test', function () {
    return gulp.src(config.paths.test)
      .pipe(jscs());
  });

  gulp.task('jscs:gulp', function () {
    return gulp.src(config.paths.gulp)
      .pipe(jscs());
  });
};
