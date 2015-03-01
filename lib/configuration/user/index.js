var _ = require('lodash');
var path = require('path');
var fs = require('fs');

var shellConfig = require('./shell');

module.exports = function (basePath, user) {
    var baseUserPath = path.join(basePath, user.unique);

    if (!fs.existsSync(baseUserPath)) {
        fs.mkdirSync(baseUserPath);
    }

    var shellPath = path.join(baseUserPath, 'shell');

    _.each([shellPath], function (folder) {
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder);
        }
    });

    var shell = shellConfig(shellPath);

    return {
        shell: shell
    }
};