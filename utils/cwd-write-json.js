const PATH = require('path');
const PROCESS = require('process');
const writeJson = require('./write-json.js');

function cwdWriteJson(...path_and_data_as_last){
	const paths = Array.from(arguments);
	const data = paths.pop();

	return writeJson(
		PATH.join(...paths),
		data
	);
}

module.exports = cwdWriteJson;
