var http = require('http');
var socketio = require('socket.io');


module.exports.start = function() {
    var server = http.createServer();
    var io = socketio.listen(server);
    server.listen(4567, 'localhost', function(){
        console.log('listening on 4567');
    });
    io.on('connection', function(){
        console.log('yay');
    });
};