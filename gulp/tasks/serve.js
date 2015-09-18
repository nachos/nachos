'use strict';

var runSequence = require('run-sequence');

module.exports = function (gulp) {
  gulp.task('serve', function (cb) {
    runSequence(
      'lint',
      'inject:js',
      'less',
      'wiredep',
      'livereload',
      [
        'electron',
        'watch'
      ],
      cb);
  });
};