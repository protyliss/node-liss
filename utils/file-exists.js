const FS = require('fs');

/**
 *
 * @param {string} path
 * @return boolean
 */

function fileExists(path) {
	try {
		return FS.lstatSync(path).isFile();
	} catch (reason) {
	}
	return false;
}

module.exports = fileExists;
