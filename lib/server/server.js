var express = require('express');

var app = express();

require('./config/express')(app);
require('./routes')(app);

var start = function () {
  // Start server
  server.listen(config.port, 'localhost', function () {
    console.log('Express server listening on %d', config.port, config.env);
  });
};

module.exports = {
  start: start
};