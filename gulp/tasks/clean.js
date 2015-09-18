'use strict';

var del = require('del');
var path = require('path');
var config = require('../config');

module.exports = function (gulp) {
  gulp.task('clean:tmp', function (cb) {
    var rootDir = 'client';

    var folders = config.client.getFolders(rootDir);

    folders.forEach(function (folder) {
      return del([path.join(rootDir, folder, '.tmp')]);
    });

    return cb();
  });
};
