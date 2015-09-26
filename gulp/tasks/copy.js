'use strict';

var config = require('../config');

module.exports = function (gulp) {
  gulp.task('copy:dist', function () {
    return gulp.src(config.paths.copy, {
      base: './',
      dot: true
    })
      .pipe(gulp.dest('./.tmp'));
  });
};
