module.exports = function(app) {

  // Insert routes below
  app.use('/config', require('./../configuration/router'));
};
