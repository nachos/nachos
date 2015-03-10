var configuration = require('./');

exports.getName = function (req, res) {
  configuration.getConfig(function (err, config) {
    res.json({name: config.name});
  });
};