'use strict';

var runSequence = require('run-sequence');

module.exports = function (gulp) {
  gulp.task('serve', function (cb) {
    runSequence(
      'lint',
      'build:client',
      'livereload',
      [
        'electron:run',
        'watch'
      ],
      cb);
  });
};