'use strict';

var less = require('gulp-less');
var path = require('path');
var config = require('../config');

module.exports = function (gulp) {
  gulp.task('less', ['inject:less'], function () {
    var rootDir = 'client';

    var folders = config.client.getFolders(rootDir);

    return folders.forEach(function (folder) {
      return gulp.src('client/' + folder + '/app/app.less')
        .pipe(less({
          paths: [
            'client/' + folder + '/bower_components',
            'client/' + folder + '/app',
            'client/' + folder + '/components'
          ]
        }))
        .pipe(gulp.dest(path.join(rootDir, folder, '.tmp/app')));
    });
  });
};
