'use strict';

var runSequence = require('run-sequence');

module.exports = function (gulp) {
  gulp.task('lint', ['lint:src', 'lint:client', 'lint:gulp']);

  gulp.task('lint:src', function (cb) {
    runSequence(
      'jshint:src',
      'jscs:src',
      cb
    );
  });

  gulp.task('lint:client', function (cb) {
    runSequence(
      'jshint:client',
      'jscs:client',
      cb
    );
  });

  gulp.task('lint:gulp', function (cb) {
    runSequence(
      'jshint:gulp',
      'jscs:gulp',
      cb
    );
  });
};
