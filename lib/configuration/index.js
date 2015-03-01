var _ = require('lodash');
var path = require('path');
var fs = require('fs');

var userConfig = require('./user');
var systemConfig = require('./system');
var programConfig = require('./programs');

module.exports = function (basePath) {
    var resolvedBasePath = path.resolve(basePath);

    if (!fs.existsSync(resolvedBasePath)) {
        fs.mkdirSync(resolvedBasePath);
    }

    var usersPath = path.join(resolvedBasePath, 'users');
    var systemPath = path.join(resolvedBasePath, 'system');
    var programsPath = path.join(resolvedBasePath, 'programs');

    _.each([usersPath, systemPath, programsPath], function (folder) {
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder);
        }
    });

    var system = systemConfig(systemPath);
    var programs = programConfig(programsPath);

    var getUserConfig = function (currentUser) {
        return userConfig(usersPath, currentUser);
    };

    return {
        system: system,
        programs: programs,
        getUserConfig: getUserConfig
    }
};