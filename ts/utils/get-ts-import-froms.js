const FS = require('fs');
const getTsFiles = require("./get-ts-files");

const _IMPORTS = /import.+from\s+['"]([^'"]+)['"]/g;
const _IMPORT = /import.+from\s+['"]([^'"]+)['"]/;

/**
 *
 * @param {string} root
 */
function getTsImportFroms(root) {
	return getTsFiles(root)
		.reduce(
			(modules, file) => {
				const source = FS.readFileSync(file, {encoding: 'utf8'});
				const imports = source.match(_IMPORTS);
				if (imports) {
					imports.forEach(_import => {
						console.log(_import);
						const from = _import.match(_IMPORT)[1];
						if (from.startsWith('.')) {
							return;
						}
						if (modules.indexOf(from) === -1) {
							modules.push(from)
						}
					})
				}
				return modules;
			},
			[]
		)
		.sort();
}

module.exports = getTsImportFroms;
