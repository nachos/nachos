'use strict';

var livereload = require('gulp-livereload');

module.exports = function (gulp) {
  gulp.task('livereload', function () {
    livereload.listen();
  });
};
