console.log('Import Angular Library as Live');

const cwdRequire        = require('../utils/cwd-require.js');
const cwdWriteJson      = require('../utils/cwd-write-json.js');
const ngLibraryPackages = require('./utils/ng-library-packages.js');

require('./utils/ng-prompt-select-library.js')()
	.then(project => {
		const libraryPackages = ngLibraryPackages(project);

		const paths = {};

		Object.keys(libraryPackages).forEach(key => {
			const {sourceRoot, packageJsonFile} = libraryPackages[key];

			const packageJson = cwdRequire(packageJsonFile);

			paths[key] = [
				packageJson.lib ?
					sourceRoot + startsWithSlash(packageJson.lib.entryFile) :
					sourceRoot + startsWithSlash(packageJson.ngPackage.lib.entryFile)
			];
		});

		const tsConfigJson = cwdRequire('tsconfig.json');

		tsConfigJson.compilerOptions.paths = {
			...tsConfigJson.compilerOptions.paths,
			...paths
		};

		console.log(paths);

		cwdWriteJson('tsconfig.json', tsConfigJson);
	});

function startsWithSlash(dir) {
	return dir.startsWith('/') ? dir : '/' + dir;
}
