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
            command_args = argv.slice(1);
        } else if ('default' in superdocker_config) {
            env_vars = superdocker_config['default'];
            command_args = argv.slice(0);
        } else {
            console.log('Error: no configuration found');
            console.log('* Please create .superdocker and place your configurations in there');
            console.log('* See %s for more information', 'http://github.com/adamkdean/superdocker');
            process.exit(1);
        }
    } else {
        console.log('Usage: superdocker <configuration> commands');
        process.exit(1);
    }

    runCommand('docker', command_args, env_vars);
}

function runCommand(command, args, env) {
    var e = {};
    extend(e, process.env, env);
    spawn(command, args, { env: e, stdio: [process.stdin, process.stdout, process.stderr]});
}

module.exports = superdocker;
