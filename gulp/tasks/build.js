'use strict';

var runSequence = require('run-sequence');

module.exports = function (gulp) {
  gulp.task('build', function (cb) {
    runSequence(
      'clean:client',
      'inject:js',
      'less',
      'wiredep',
      cb
    );
  });

  gulp.task('build:dist', function (cb) {
    runSequence(
      'lint',
      'build',
      'copy:dist',
      'electron:build',
      'clean:tmp',
      cb
    );
  });
};
