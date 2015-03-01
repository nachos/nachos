var childProcess = require('child_process');
var spawn = childProcess.spawn;
var exec = childProcess.exec;

var configuration = require('./configuration');
var auth = require('./auth');
var shell = require('./shell');
var services = require('./services');

//var api = require('./api');
var server = require('./server');

exports.run = function() {
    var config = configuration('C:\\nachos');
    var userConfig = config.getUserConfig(auth.getCurrentUser());
    shell.start(userConfig.shell);
    services.start(userConfig ,config.programs)

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