'use strict';

var jscs = require('gulp-jscs');
var config = require('../config');

module.exports = function (gulp) {
  gulp.task('jscs', ['jscs:src', 'jscs:client', 'jscs:gulp']);

  gulp.task('jscs:src', ['jscs:src:js', 'jscs:src:test']);

  gulp.task('jscs:src:js', function () {
    return gulp.src(config.paths.src.js)
      .pipe(jscs());
  });

  gulp.task('jscs:src:test', function () {
    return gulp.src(config.paths.src.test)
      .pipe(jscs());
  });

  gulp.task('jscs:client', ['jscs:client:js', 'jscs:client:test']);

  gulp.task('jscs:client:js', function () {
    return gulp.src(config.paths.client.js)
      .pipe(jscs());
  });

  gulp.task('jscs:client:test', function () {
    return gulp.src(config.paths.client.test)
      .pipe(jscs());
  });

  gulp.task('jscs:gulp', function () {
    return gulp.src(config.paths.gulp)
      .pipe(jscs());
  });
};
