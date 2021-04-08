const getTsImportFroms = require('./get-ts-import-froms.js');

function getTsImportModules(root) {
	return getTsImportFroms(root)
		.map(path => {
			return path.split('/').slice(0, 2).join('/')
		})
		.filter((module, index, self) => {
			return self.indexOf(module) === index;
		})
}

module.exports = getTsImportModules;
