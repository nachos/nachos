'use strict';

module.exports = function (app) {

  // Insert routes below
  app.use('/api/system', require('./api/system'));
};
