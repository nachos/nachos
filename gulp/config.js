'use strict';

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
      html: ['./client/**/*.html', '!./client/bower_components/**/*.html'],
      windows: ['login', 'choose-default']
    },
    gulp: ['./gulpfile.js', './gulp/**/*.js'],
    coverage: 'coverage/**/lcov.info',
    electron: '.',
    copy: ['package.json', 'nachos.json', 'README.md', 'LICENSE', './src/**/*', './client/**/*']
  },
  manifests: ['./package.json', './bower.json']
};