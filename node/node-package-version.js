const cwdFileExists = require("../utils/cwd-file-exists");
const setVersionByTime = require("../core/set-version-by-time");
const getFilesLastModifiedTime = require("../core/get-files-last-modified-time");

console.log(`Set 'package.json' Version`);

if (!cwdFileExists('package.json')) {
	process.exit('Cannot found package.json');
}

const lastModifiedTime = getFilesLastModifiedTime('.');

console.log(lastModifiedTime);

setVersionByTime(lastModifiedTime, 'package.json');
