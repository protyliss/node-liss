const getFiles = require("../../core/get-files");

function getTsFiles(root) {
	return getFiles(root + '/**/*.ts')
		.filter(filename => {
			return filename.indexOf('.test.') === -1;
		});
}

module.exports = getTsFiles;
