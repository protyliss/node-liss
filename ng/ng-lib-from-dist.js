console.log('Import Angular Library as Built');

const cwdRequire            = require('../utils/cwd-require.js');
const cwdWriteJson          = require('../utils/cwd-write-json.js');
const ngLibraryPackages     = require('./utils/ng-library-packages.js');
const ngPromptSelectLibrary = require("./prompts/select-library");
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

			const {root}            = project;
			const ngPackageJsonFile = project.architect.build.options.project
			const ngPackageJson     = cwdRequire(ngPackageJsonFile);
			const dest              = PATH.join(root, ngPackageJson.dest).replace(/\\/g, '/');

			paths[key] = [
				dest,
				dest + '/' + (
					key
						.replace(/^@/, '')
						.replace(/[\/]/g, '-')
				)
			];

			console.log(paths[key]);

			console.groupEnd();
		});

		cwdWriteJson('tsconfig.json', tsConfigJson);
	});
