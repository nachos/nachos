var program = require('commander');
var pkg = require('../package.json');
var nachos = require('./nachos');


program
    .version(pkg.version)
    .description('A cli tool to help you use nachos')
    .usage('<command>');

program
    .command('run')
    .description('Run nachos')
    .action(function () {
        nachos.run();
    });

program
    .parse(process.argv);
