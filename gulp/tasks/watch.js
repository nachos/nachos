'use strict';

var livereload = require('gulp-livereload');
var config = require('../config');

module.exports = function (gulp) {
  gulp.task('watch', function () {
    gulp.watch(config.paths.client.less, ['less']);
    gulp.watch(config.paths.client.js, ['inject:js']);

    gulp.watch(['client/**/.tmp/**/*.css'].concat(config.paths.client.html, config.paths.client.assets, config.paths.client.js),
      function (event) {
        livereload.changed(event.path);
      });
  });
};
