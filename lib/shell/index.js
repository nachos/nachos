var exec = require('child_process').exec;
var path = require('path');
var screen = require('native-api').screen;
var _ = require('lodash');

var start = function (shell) {
  var pathToShell = path.resolve('node_modules/nachos-shell/client');
  var commandToRun = shell || 'nw ' + pathToShell;
  console.log('Starting shell: ' + commandToRun);

  _.forEach(screen.getAllScreens(), function (screen) {
    exec(commandToRun + ' ' + screen.handle, function (err) {
      if (err) return console.log(err);
    })
  });
};

module.exports = {
  start: start
};