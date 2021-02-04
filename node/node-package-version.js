console.log('Set Package Version');

const cwdFileExists = require("../utils/cwd-file-exists");
const setVersionByTime = require("../core/set-version-by-time");
const getFilesLastModifiedTime = require("../core/get-files-last-modified-time");

if (!cwdFileExists('package.json')) {
	process.exit('Cannot found package.json');
}

const lastModifiedTime = getFilesLastModifiedTime('.');

setVersionByTime(lastModifiedTime, 'package.json');
