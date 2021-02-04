const PROCESS = require('process');
const PATH = require('path');
const GLOB = require('glob');

function getFiles(pattern) {
	return GLOB.sync(
		PATH.join(
			PROCESS.cwd(),
			pattern
		)
	);
}

module.exports = getFiles;
