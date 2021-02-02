const PATH       = require('path');
const PROCESS    = require('process');
const fileExists = require('./file-exists.js');

/**
 *
 * @param {string} paths
 */
function cwdFileExists(...paths) {
	return fileExists(PATH.join(PROCESS.cwd(), ...paths));
}

module.exports = cwdFileExists;
