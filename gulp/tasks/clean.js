'use strict';

var rimraf = require('rimraf');

module.exports = function (gulp) {
  gulp.task('clean', ['clean:client', 'clean:tmp']);

  gulp.task('clean:client', function (cb) {
    rimraf('client/*/.tmp', cb);
  });

  gulp.task('clean:tmp', function (cb) {
    rimraf('.tmp', cb);
  });
};
