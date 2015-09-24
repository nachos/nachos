'use strict';

var rimraf = require('rimraf');

module.exports = function (gulp) {
  gulp.task('clean', ['clean:tmp']);

  gulp.task('clean:tmp', function (cb) {
    rimraf('client/*/.tmp', cb);
  });
};
