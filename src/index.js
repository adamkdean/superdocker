var fs = require('fs'),
    ini = require('ini'),
    extend = require('extend'),
    optimist = require('optimist').argv,
    exec = require('child_process').exec,
    spawn = require('child_process').spawn,
    pkg = require('../package.json');

var HOME_DIR = process.env.HOME,
    SUPERDOCKER_CONFIG = HOME_DIR + '/.superdocker';

var env_vars,
    command_args,
    superdocker_config,
    argv = process.argv.slice(2);

function superdocker() {
    if (optimist.version) {
        console.log(pkg.version);
        process.exit(0);
    }

    if (fs.existsSync(SUPERDOCKER_CONFIG)) {
        superdocker_config = ini.parse(fs.readFileSync(SUPERDOCKER_CONFIG, 'utf8'));
    } else {
        console.log('Error: no superdocker config');
        process.exit(1);
    }

    if (argv && argv.length > 0) {
        if (argv[0] in superdocker_config) {
            env_vars = superdocker_config[argv[0]];
        } else {
            console.log('Error: configuration not found');
            process.exit(1);
        }
    } else {
        console.log('Error: no configuration specified');
        process.exit(1);
    }

    if (argv.length > 1) {
        command_args = argv.slice(1);
    } else {
        console.log('Error: no command specified');
        process.exit(1);
    }

    runCommand('docker', command_args, env_vars);
}

function runCommand(command, args, env) {
    var e = {};
    extend(e, process.env);
    extend(e, env);
    spawn(command, args, { env: env, stdio: [process.stdin, process.stdout, process.stderr]});
}

module.exports = superdocker;
