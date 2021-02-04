const ngPromptSelectApplication = require("./prompts/select-application");
const cwdRequire                = require("../utils/cwd-require");
const getTsImportModule         = require("../ts/utils/get-ts-import-module");
const cwdFileExists             = require("../utils/cwd-file-exists");
const getConfigure              = require("../core/get-configure");
const cwdWriteJson              = require("../utils/cwd-write-json");
const removeDir                 = require("../utils/remove-dir");

console.log('Detach Workspace as Single project from Multiple Projects.');

const configure = getConfigure({
	ng: {
		appDetach: {
			addDependencies: {}
		}
	}
});

ngPromptSelectApplication({requiredConfirm: true})
	.then(({key: selectedKey, project}) => {

		const angularJson  = cwdRequire('angular.json');
		const packageJson  = cwdRequire('package.json');
		const tsconfigJson = cwdRequire('tsconfig.json');

		const {root} = project;

		const usedModules = getTsImportModule(root);
		const projects    = {...angularJson.projects};

		let current            = -1;
		const usedLocalModules = [selectedKey];
		//const remoteProjects = [];
		while (++current < usedModules.length) {
			const module       = usedModules[current];
			const localProject = projects[module];

			if (!localProject) {
				//remoteProjects.push(module);
				continue;
			}

			if (usedLocalModules.indexOf(module) > -1) {
				continue;
			}

			usedLocalModules.push(module)

			getTsImportModule(localProject.root).forEach((_module) => {
				if (usedModules.indexOf(_module) === -1) {
					usedModules.push(_module);
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
			ng   : "ng",
			serve: "ng serve --open",
			build: "ng build",
			prod : "ng build --prod",
			test : "ng test",
			lint : "ng lint",
			e2e  : "ng e2e"
		}

		if (cwdFileExists(root, 'package.json')) {
			const appPackageJson    = cwdRequire(root, 'package.json');
			packageJson.name        = appPackageJson.name;
			packageJson.description = appPackageJson.description;
			packageJson.version     = appPackageJson.version;
		}

		console.group('Remove Unused Package');
		const {dependencies} = packageJson;
		Object.keys(dependencies).forEach(di => {
			if (di.startsWith('@angular')) {
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
			const splitedKey = key.split('/');
			const module     = splitedKey.length > 2 ?
				splitedKey.slice(0, 2).join('/') :
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
	.catch(() => {
		cwdRequire('liss.js');
	})
