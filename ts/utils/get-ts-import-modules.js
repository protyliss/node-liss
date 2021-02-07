const getTsImportFroms = require('./get-ts-import-froms.js');

function getTsImportModules(root) {
	return getTsImportFroms(root)
		.filter(path => {
			return path.split('/') < 3;
		})
}

module.exports = getTsImportModules;
