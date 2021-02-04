const getFiles = require("../../core/get-files");

function getTsFiles(root) {
	return getFiles(root + '/**/*.ts');
}

module.exports = getTsFiles;
