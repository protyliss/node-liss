const ngProjects = require("./utils/ng-projects");
const cwdFileExists = require("../utils/cwd-file-exists");
const cwdRequire = require("../utils/cwd-require");
const cwdWriteJson = require("../utils/cwd-write-json");
console.log('Optimize (package.json).scripts');

const scripts = {};
let port = 4200;

const configure = {
	ng: {
		optimizeScripts: {
			application: null,
			library: null
		}
	},
	...(cwdFileExists('liss.json') ? cwdRequire('liss.json') : {})
};

const jobConfigure = configure.ng.optimizeScripts;

Object.entries(ngProjects())
	.sort((a, b) => a[0].localeCompare(b[0]))
	.forEach(([key, project]) => {

		const projectFlag = `--project=${key}`;

		if (project.projectType === 'application') {
			const portFlag = projectFlag + ` --port=${port++}`;

			scripts[key + ':serve'] = `ng serve ${portFlag} --open`;
			scripts[key + ':build'] = `ng build ${projectFlag} --output-hashing=all`;
			scripts[key + ':prod'] = scripts[key + ':build'] + ' --prod --verbose';

			addAdditionalScript(scripts, jobConfigure.application, key);

		} else {
			scripts[key + ':build'] = `ng build ${projectFlag}`;
			scripts[key + ':prod'] = scripts[key + ':build'] + ' --prod';
			addAdditionalScript(scripts, jobConfigure.library, key);
		}
	});

function addAdditionalScript(scripts, map, key) {
	if (!map) {
		return;
	}
	Object.entries(map).forEach(entry => {
		scripts[entry[0].replace('{{key}}', key)] = entry[1].replace('{{key}}', key);
	});
}

const packageJson = cwdRequire('package.json');

packageJson.scripts = scripts;

cwdWriteJson('package.json', packageJson);
