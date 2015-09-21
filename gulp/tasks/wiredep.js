'use strict';

var wiredep = require('wiredep').stream;

module.exports = function (gulp) {
  gulp.task('wiredep', function () {
    return gulp.src('client/**/index.html')
      .pipe(wiredep({
        ignorePath: 'client/'
      }))
      .pipe(gulp.dest('client'));
  });
};
