'use strict';

var stylish = require('jshint-stylish');
var lazypipe = require('lazypipe');
var jshint = require('gulp-jshint');
var config = require('../config');

var jshintPipe = function (jshintrc) {
  return lazypipe()
    .pipe(jshint, jshintrc)
    .pipe(jshint.reporter, stylish)
    .pipe(jshint.reporter, 'fail')();
};

module.exports = function (gulp) {
  gulp.task('jshint', ['jshint:src', 'jshint:client', 'jshint:gulp']);

  gulp.task('jshint:src', ['jshint:src:js', 'jshint:src:test']);

  gulp.task('jshint:src:js', function () {
    return gulp.src(config.paths.src.js)
      .pipe(jshintPipe('.jshintrc'));
  });

  gulp.task('jshint:src:test', function () {
    return gulp.src(config.paths.src.test)
      .pipe(jshintPipe('.spec.jshintrc'));
  });

  gulp.task('jshint:client', ['jshint:client:js', 'jshint:client:test']);

  gulp.task('jshint:client:js', function () {
    return gulp.src(config.paths.client.js)
      .pipe(jshintPipe('.client.jshintrc'));
  });

  gulp.task('jshint:client:test', function () {
    return gulp.src(config.paths.client.test)
      .pipe(jshintPipe('.spec.jshintrc'));
  });

  gulp.task('jshint:gulp', function () {
    return gulp.src(config.paths.gulp)
      .pipe(jshintPipe('.jshintrc'));
  });
};
