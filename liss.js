#!/usr/bin/env node

const cwdFileExists = require('./utils/cwd-file-exists.js');

console.log('LISS in the Command line')

function run() {
	if (cwdFileExists('angular.json')) {
		return require('./ng/liss.js');
	}

	if (cwdFileExists('package.json')) {
		return require('./node/liss.js');
	}

	console.warn('Cannot Found Supported Platform');
	process.exit();
}

run();
