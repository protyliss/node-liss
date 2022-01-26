const ngPromptSelectApplication = require('./prompts/select-application.js');
const cwdWriteJson              = require('../utils/cwd-write-json');
const cwdRequire                = require('../utils/cwd-require.js');

console.log('Add Worker Configures to Application');

ngPromptSelectApplication({multiple: true})
	.then(selectedProjects => {

		const angularJson = cwdRequire('angular.json');
		const projects    = angularJson.projects;

		selectedProjects.forEach(([key, project]) => {
			console.group(key);

			const {root}       = project;
			const forward      = '../'.repeat(root.split('/').length);
			const workerConfig = [
				root,
				'tsconfig.worker.json'
			].join('/')

			const relateProject = projects[key];

			relateProject.architect.build.options.webWorkerTsConfig = workerConfig;
			relateProject.architect.test.options.webWorkerTsConfig  = workerConfig;

			cwdWriteJson(workerConfig, {
					extends        : forward + 'tsconfig.json',
					compilerOptions: {
						outDir: forward + 'out-tsc/worker',
						lib   : [
							'es2018',
							'webworker'
						],
						types : []
					},
					include        : [
						'src/**/*.worker.ts'
					]
				}
			);

			console.groupEnd();
		});

		cwdWriteJson('angular.json', angularJson);
	});
