'use strict';

module.exports = function (app) {
  app.use('/api/system', require('./api/system'));
};
