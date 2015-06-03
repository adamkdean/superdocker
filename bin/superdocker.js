#!/usr/bin/env node
'use strict';

var superdocker = require('../src/'),
    pkg = require('../package.json'),
    updateNotifier = require('update-notifier'),
    notifier = updateNotifier({
        packageName: pkg.name,
        packageVersion: pkg.version
    });

if (notifier.update) {
    notifier.notify();
}

superdocker();
