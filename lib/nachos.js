var childProcess = require('child_process');
var spawn = childProcess.spawn;
var exec = childProcess.exec;

var users = require('./configuration/users');
var auth = require('./auth');
var shell = require('./shell');
var services = require('./services');

//var api = require('./api');
var server = require('./server');

exports.run = function() {
    var userConfig = users.getUserConfig(auth.getCurrentUser());
    shell.start();
    services.start(userConfig ,config.getProgramsConfig());

    // windows only for now
    /*console.log('killing explorer.exe');
    killTask('explorer.exe', function(){
        console.log('ohh yeah!');

        startTask('cmd',['/c', '%windir%\\explorer.exe'],{ detached: true, stdio: [ 'ignore', 'ignore', 'ignore' ] });
    });*/
    //server.start();
};

function killTask (name, cb) {
    // windows only for now
    exec('taskkill /f /IM ' + name, cb);
}

function startTask (command, args, options) {
    var proccess = spawn(command, args, options);
    proccess.unref();
}