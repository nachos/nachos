'use strict';

var inject = require('gulp-inject');
var path = require('path');

var config = require('../config');

module.exports = function (gulp) {
  gulp.task('inject', ['inject:js', 'inject:less']);

  gulp.task('inject:less', function () {
    var rootDir = 'client';

    var folders = config.client.getFolders(rootDir);

    return folders.forEach(function (folder) {
      return gulp.src('client/' + folder + '/**/app.less')
        .pipe(inject(gulp.src([
          'client/' + folder + '/app/**/*.less',
          '!client/' + folder + '/app/app.less'
        ], {read: false}), {
          transform: function (filePath) {
            filePath = filePath.replace('/client/' + folder + '/app/', '');

            return '@import \'' + filePath + '\';';
          },
          starttag: '// injector',
          endtag: '// endinjector'
        }))
        .pipe(gulp.dest(path.join(rootDir, folder)));
    });
  });

  gulp.task('inject:js', function () {
    var rootDir = 'client';

    var folders = config.client.getFolders(rootDir);

    return folders.forEach(function (folder) {
      return gulp.src('client/' + folder + '/**/index.html')
        .pipe(inject(gulp.src([
          'client/' + folder + '/{app,components}/**/*.js',
          '!client/' + folder + '/app/app.js',
          '!client/' + folder + '/{app,components}/**/*.spec.js',
          '!client/' + folder + '/{app,components}/**/*.mock.js'
        ], {read: false}), {
          transform: function (filePath) {
            filePath = filePath.replace('/client/' + folder + '/', '');

            return '<script src="' + filePath + '"></script>';
          },
          starttag: '<!-- injector:js -->',
          endtag: '<!-- endinjector -->'
        }))
        .pipe(gulp.dest(path.join(rootDir, folder)));
    });
  });
};
