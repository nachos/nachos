'use strict';

module.exports = {
  paths: {
    src: ['./src/**/*.js', '!./src/**/*.spec.js'],
    test: './src/**/*.spec.js',
    gulp: ['./gulpfile.js', './gulp/**/*.js'],
    coverage: 'coverage/**/lcov.info',
    electron: '.'
  },
  manifests: ['./package.json']
};