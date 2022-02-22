const cwdFileExists            = require("../utils/cwd-file-exists");
const setVersionByTime         = require("../core/set-version-by-time");
const getFilesLastModifiedTime = require("../core/get-files-last-modified-time");
const {underline}              = require('../decorate.js');

console.log(underline`Set 'package.json' Version by Last Modified Time`);

if (!cwdFileExists('package.json')) {
	console.warn('Cannot found package.json');
	process.exit();
}

const lastModifiedTime = getFilesLastModifiedTime('.');

console.log((new Date(lastModifiedTime)).toLocaleString());

setVersionByTime(lastModifiedTime, 'package.json');
