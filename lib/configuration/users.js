var path = require('path');
var fs = require('fs');

module.exports = function (basePath) {

  var getUserConfig = function (user) {
    var baseUserPath = path.join(basePath, user.unique);

    if (!fs.existsSync(baseUserPath)) {
      fs.mkdirSync(baseUserPath);
    }
  };

  return {
    getUserConfig: getUserConfig
  }
};