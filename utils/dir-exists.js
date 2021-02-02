const FS = require('fs');

/**
 *
 * @param {string} path
 * @return boolean
 */

function dirExists(path) {
	try {
		return FS.lstatSync(path).isDirectory();
	} catch (reason) {
	}
	return false;
}

module.exports = dirExists;
