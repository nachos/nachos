'use strict';

var fs = require('fs');
var path = require('path');

function getFolders(dir) {
  return fs.readdirSync(dir)
    .filter(function (file) {
      return fs.statSync(path.join(dir, file)).isDirectory() && file !== 'bower_components';
    });
}

module.exports = {
  paths: {
    src: {
      js: ['./src/**/*.js', '!./src/**/*.spec.js'],
      test: './src/**/*.spec.js'
    },
    client: {
      js: ['./client/**/*.js', '!./client/**/*.spec.js', '!./client/bower_components/**/*.js'],
      test: ['./client/**/*.spec.js', '!./client/bower_components/**/*.js'],
      less: ['./client/**/*.less', '!./client/bower_components/**/*.less'],
      assets: ['./client/**/assets/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'],
      html: ['./client/**/*.html', '!./client/bower_components/**/*.html']
    },
    gulp: ['./gulpfile.js', './gulp/**/*.js'],
    coverage: 'coverage/**/lcov.info',
    electron: '.'
  },
  client: {
    getFolders: getFolders
  },
  manifests: ['./package.json', './bower.json']
};