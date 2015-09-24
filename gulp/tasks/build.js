'use strict';

var runSequence = require('run-sequence');

module.exports = function (gulp) {
  gulp.task('build', function (cb) {
    runSequence(
      'clean',
      'inject:js',
      'less',
      'wiredep',
      cb
    );
  });
};
