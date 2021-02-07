const cwdRequire = require('../utils/cwd-require.js');
const cwdWriteJson = require('../utils/cwd-write-json.js');
const ngPromptSelectLibrary = require("./prompts/select-library");
console.log('Import Angular Library as Node Module');

ngPromptSelectLibrary({multiple: true})
	.then((selectedProjects) => {
		selectedProjects.forEach(([key, project]) => {
			console.group(key);
			const {name} = project;

			const tsConfigJson = cwdRequire('tsconfig.json');
			const {paths} = tsConfigJson.compilerOptions;

			Object.keys(paths).forEach(key => {
				if (key.startsWith(name)) {
					console.log('delete', key);
					delete paths[key];
				}
			});

			cwdWriteJson('tsconfig.json', tsConfigJson);
			console.groupEnd();
		});
	});
