#!/usr/bin/env node

const cwdFileExists = require('./utils/cwd-file-exists.js');

console.log('LISS in the Command line')

if (cwdFileExists('angular.json')) {
	require('./ng/liss.js');
} else {
	console.warn('Cannot Found Supported Platform');
	process.exit();
}
