const ngPromptSelectProject = require('./prompts/select-project.js');
const cwdRequire            = require('../utils/cwd-require.js');
const cwdWriteJson          = require('../utils/cwd-write-json.js');
const FS                    = require('fs');
const PATH                  = require('path');

console.log('Remove Project');

ngPromptSelectProject({
	requireConfirm: true
})
	.then(([selectedKey, project]) => {

		const angularJson  = cwdRequire('angular.json');
		const tsconfigJson = cwdRequire('tsconfig.json');


		const root = PATH.join(process.cwd(), project['root']);

		if (FS.existsSync(root)) {
			FS.rmSync(root, {recursive: true});
		}

		delete angularJson['projects'][selectedKey];

		cwdWriteJson('angular.json', angularJson);

		const {paths} = tsconfigJson.compilerOptions;

		Object.keys(paths).forEach(path => {
			if (path.startsWith(selectedKey)) {
				delete paths[path];
			}
		});

		cwdWriteJson('tsconfig.json', tsconfigJson);

		console.log(`Removed Project: ${selectedKey}`);
	});
