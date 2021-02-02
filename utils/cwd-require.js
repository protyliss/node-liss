const PATH    = require('path');
const PROCESS = require('process');

/**
 *
 * @param {string}paths
 * @return {*}
 */
function cwdRequire(...paths) {
	return require(
		PATH.join(
			PROCESS.cwd(),
			...paths
		)
	);
}

module.exports = cwdRequire;
