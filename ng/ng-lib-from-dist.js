console.log('Import Angular Library as Built');

const cwdRequire            = require('../utils/cwd-require.js');
const cwdWriteJson          = require('../utils/cwd-write-json.js');
const ngLibraryPackages     = require('./utils/ng-library-packages.js');
const ngPromptSelectLibrary = require("./prompts/select-library");

ngPromptSelectLibrary({multiple: true})
	.then((selectedProjects) => {
		selectedProjects.forEach(([key, project]) => {
			console.group(key);
			const libraryPackages = ngLibraryPackages(project);
			const tsConfigJson = cwdRequire('tsconfig.json');

			const {paths} = tsConfigJson.compilerOptions

			Object.keys(libraryPackages).forEach(key => {
				const {distRoot} = libraryPackages[key];

				paths[key] = [
					distRoot,
					distRoot + '/' + key
						.replace(/^@/, '')
						.replace(/[\/]/g, '-')
				];

			});

			cwdWriteJson('tsconfig.json', tsConfigJson);

			console.log(paths);
			console.groupEnd();
		});
	});
