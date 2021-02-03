const PATH = require('path');
const PROCESS = require('process');
const writeJson = require('./write-json.js');

function cwdWriteJson(...path_and_dataAsLast) {
	const paths = Array.from(arguments);
	const data = paths.pop();

	return writeJson(
		PATH.join(PROCESS.cwd(), ...paths),
		data
	);
}

module.exports = cwdWriteJson;
