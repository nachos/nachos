var exec = require('child_process').exec;
var path = require('path');

var start = function (shell) {
  console.log('Starting shell: ' + shell);
  var pathToShell = path.resolve('node_modules/nachos-shell/client');
  var commandToRun = shell || 'nw ' + pathToShell;

  exec(commandToRun, function (err) {
    if (err) return console.log(err);
  })
};

module.exports = {
  start: start
};