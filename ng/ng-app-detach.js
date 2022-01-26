const ngPromptSelectApplication = require("./prompts/select-application");
const cwdRequire = require("../utils/cwd-require");
const cwdFileExists = require("../utils/cwd-file-exists");
const getConfigure = require("../core/get-configure");
const cwdWriteJson = require("../utils/cwd-write-json");
const removeDir = require("../utils/remove-dir");
const getTsImportModules = require("../ts/utils/get-ts-import-modules");

console.log('Detach Workspace as Single project from Multiple Projects.');

const configure = getConfigure({
	ng: {
		appDetach: {
			addDependencies: {}
		}
	}
});

ngPromptSelectApplication({
	requireConfirm: true
})
	.then(([selectedKey, project]) => {

		const angularJson = cwdRequire('angular.json');
		const packageJson = cwdRequire('package.json');
		const tsconfigJson = cwdRequire('tsconfig.json');

		const {root} = project;

		const usedModules = getTsImportModules(root);
		const projects = {...angularJson.projects};

		let current = -1;
		const usedLocalModules = [selectedKey];
		//const remoteProjects = [];
		while (++current < usedModules.length) {
			const module = usedModules[current];
			const localProject = projects[module];

			if (!localProject) {
				//remoteProjects.push(module);
				continue;
			}

			if (usedLocalModules.indexOf(module) > -1) {
				continue;
			}

			usedLocalModules.push(module)

			getTsImportModules(localProject.root).forEach((_module) => {
				const index = usedModules.indexOf(_module);
				if (index === -1) {
					usedModules.push(_module);
				} else {
					console.warn('pass', _module, index);
				}
			});
		}

		const removeDirs = [];

		console.group('angular.json')

		console.log('Update Properties');
		angularJson.defaultProject = selectedKey;

		console.group('Remove Unused Project')

		Object.keys(projects).forEach(key => {
			if (usedLocalModules.indexOf(key) > -1) {
				return;
			}

			console.warn('Remove:', key);
			const project = projects[key];
			removeDirs.push(project.root);
			delete projects[key];
		});

		console.log(usedLocalModules);

		console.groupEnd();


		console.groupEnd();

		//////////////////////////////

		console.group('package.json')


		console.log('Update Properties');
		packageJson.scripts = {
			serve: "ng serve --open",
			build: "ng build",
			prod: "ng build --prod",
			test: "ng test",
			lint: "ng lint",
			e2e: "ng e2e"
		}

		if (cwdFileExists(root, 'package.json')) {
			const appPackageJson = cwdRequire(root, 'package.json');
			packageJson.name = appPackageJson.name;
			packageJson.description = appPackageJson.description;
			packageJson.version = appPackageJson.version;
		}

		console.group('Remove Unused Package');
		const {dependencies} = packageJson;

		const required = [
			'rxjs',
			'tslib',
			'zone.js'
		];

		Object.keys(dependencies).forEach(di => {
			if (di.startsWith('@angular')) {
				return;
			}

			const isRequired = required.indexOf(di);
			if (isRequired > -1) {
				required.splice(isRequired, 1);
				return;
			}

			if (usedModules.indexOf(di) === -1) {
				console.log('Remove:', di);
				delete dependencies[di];
			}
		});

		packageJson.dependencies = {
			...dependencies,
			...(configure.ng.appDetach.addDependencies || {})
		};

		console.log(packageJson.dependencies);

		console.groupEnd();

		console.groupEnd();

		//////////////////////////////

		console.group('tsconfig.json')

		const {paths} = tsconfigJson.compilerOptions;
		Object.keys(paths).forEach(key => {
			const segments = key.split('/');
			const module = segments.length > 2 ?
				segments.slice(0, 2).join('/') :
				key;
			if (usedModules.indexOf(module) === -1) {
				console.log('Remove:', key);
				delete paths[key];
			}
		});


		console.groupEnd()

		removeDirs.forEach(removeDir);
		cwdWriteJson('angular.json', angularJson);
		cwdWriteJson('package.json', packageJson);
		cwdWriteJson('tsconfig.json', tsconfigJson);
	})
	.catch(reason => {
		console.log(reason);
	})
