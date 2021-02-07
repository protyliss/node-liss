console.log('Import Angular Library as Live');

const cwdRequire = require('../utils/cwd-require.js');
const cwdWriteJson = require('../utils/cwd-write-json.js');
const ngLibraryPackages = require('./utils/ng-library-packages.js');
const ngPromptSelectLibrary = require("./prompts/select-library");

ngPromptSelectLibrary({multiple: true})
	.then((selectedProjects) => {
		selectedProjects.forEach(([key, project]) => {
			console.group(key);
			const libraryPackages = ngLibraryPackages(project);

			const paths = {};

			Object.keys(libraryPackages).forEach(key => {
				const {sourceRoot, packageJsonFile} = libraryPackages[key];

				const packageJson = cwdRequire(packageJsonFile);

				paths[key] = [
					packageJson.lib ?
						sourceRoot + entryFile(packageJson.lib.entryFile) :
						sourceRoot + entryFile(packageJson.ngPackage.lib.entryFile)
				];

				paths[key + '/*'] = [
						sourceRoot + '/*'
				];
			});

			const tsConfigJson = cwdRequire('tsconfig.json');

			tsConfigJson.compilerOptions.paths = {
				...tsConfigJson.compilerOptions.paths,
				...paths
			};

			console.log(paths);

			cwdWriteJson('tsconfig.json', tsConfigJson);
			console.groupEnd();
		});
	});
function entryFile(file) {
	if (!file.startsWith('/')) {
		file = '/' + file;
	}
	return file.substr(0, file.length - 3);
}
