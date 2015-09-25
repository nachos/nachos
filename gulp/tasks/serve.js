'use strict';

var runSequence = require('run-sequence');

module.exports = function (gulp) {
  gulp.task('serve', function (cb) {
    runSequence(
      'lint',
      'build',
      'livereload',
      [
        'electron:run',
        'watch'
      ],
      cb);
  });
};