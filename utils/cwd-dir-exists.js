const PATH       = require('path');
const PROCESS    = require('process');
const dirExists = require('./dir-exists.js');

/**
 *
 * @param {string} path
 * @return boolean
 */
function cwdDirExists(path) {
	return dirExists(PATH.join(PROCESS.cwd(), path));
}

module.exports = cwdDirExists;
