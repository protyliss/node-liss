console.log('Import Angular Library as Live');

const cwdRequire            = require('../utils/cwd-require.js');
const cwdWriteJson          = require('../utils/cwd-write-json.js');
const ngPromptSelectLibrary = require("./prompts/select-library");
const GLOB                  = require('glob');
const PATH                  = require('path');

ngPromptSelectLibrary({multiple: true})
	.then((selectedProjects) => {
		const tsConfigJson = cwdRequire('tsconfig.json');
		const {paths}      = tsConfigJson.compilerOptions

		selectedProjects.forEach(([key, project]) => {
			console.group(key);

			Object.keys(paths).forEach(pathKey => {
				if (pathKey.startsWith(key)) {
					console.warn('Remove:', pathKey);
					delete paths[pathKey];
				}
			});

			const ngPackageJsonFile = project.architect.build.options.project
			const ngPackageJson     = cwdRequire(ngPackageJsonFile);


			paths[key] = [
				project.root + '/' + entryFile(ngPackageJson)
			];

			console.log(paths[key]);

			const subPackages = GLOB.sync(project.root + '/*/ng-package.json');

			subPackages.forEach(subPackage => {
				const subPackageRoot   = PATH.dirname(subPackage);
				const subPackageName   = PATH.basename(subPackageRoot);
				const subKey           = key + '/' + subPackageName;
				const subNgPackageJson = cwdRequire(subPackage);

				paths[subKey] = [
					subPackageRoot + '/' + entryFile(subNgPackageJson)
				];

				console.log(paths[subKey]);
			});

			console.groupEnd();
		});

		cwdWriteJson('tsconfig.json', tsConfigJson);
	});

function entryFile(ngPackageJson) {
	return ngPackageJson.lib.entryFile.replace(/.ts$/, '')
}
