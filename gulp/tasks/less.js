'use strict';

var less = require('gulp-less');
var path = require('path');
var es = require('event-stream');

var config = require('../config');

module.exports = function (gulp) {
  gulp.task('less', ['inject:less'], function () {
    var folders = config.paths.client.windows;

    var streams = folders.map(function (folder) {
      return gulp.src('client/' + folder + '/app/app.less')
        .pipe(less({
          paths: [
            'client/' + folder + '/bower_components',
            'client/' + folder + '/app',
            'client/' + folder + '/components'
          ]
        }))
        .pipe(gulp.dest(path.join('client', folder, '.tmp/app')));
    });

    return es.merge(streams);
  });
};
