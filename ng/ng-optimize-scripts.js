const PATH                  = require('path');
const PROCESS               = require('process');
const ngProjects            = require("./utils/ng-projects");
const cwdRequire            = require("../utils/cwd-require");
const cwdWriteJson          = require("../utils/cwd-write-json");
const getConfigure          = require('../core/get-configure.js');
const {DoubleBraceTemplate} = require('@js-dot/frame/template');

console.log('Optimize package.scripts');


let port = 4200;

const configure = getConfigure({
	ng: {
		optimizeScripts: {
			application: null,
			library    : null,
			scripts    : null
		}
	}
});

const jobConfigure = configure?.ng?.optimizeScripts || {};

const scripts = jobConfigure.scripts || {};

Object.entries(ngProjects()).forEach(
	([key, project]) => {
		const projectFlag = `--project=${key}`;

		const additionalScriptValues = {
			key,
			root: './' + project['root']
		}

		if (project['projectType'] === 'application') {
			const portFlag = projectFlag + ` --port=${port++}`;

			scripts[key + ':serve'] = `ng serve ${portFlag} --open`;
			scripts[key + ':build'] = `ng build ${projectFlag} --output-hashing=all`;
			scripts[key + ':prod']  = scripts[key + ':build'] + ' --configuration=production';

			addAdditionalScripts(scripts, jobConfigure.application, additionalScriptValues);

		} else {
			scripts[key + ':build'] = `ng build ${projectFlag}`;
			scripts[key + ':watch'] = scripts[key + ':build'] + ' --watch';
			scripts[key + ':prod']  = scripts[key + ':build'] + ' --configuration=production';

			const ngPackageFile       = project['architect'].build.options['project'];
			const ngPackage           = cwdRequire(ngPackageFile)
			const dest                = PATH
				.join(PATH.dirname(ngPackageFile), ngPackage['dest'])
				.replace(/\\/g, '/');
			scripts[key + ':publish'] = `cd ${dest} && npm publish`

			addAdditionalScripts(scripts, jobConfigure.library, additionalScriptValues);
		}
	}
);

function addAdditionalScripts(scripts, patterns, values) {
	if (!patterns) {
		return;
	}

	Object.entries(patterns).forEach(([keyExpression, scriptExpression]) => {
		const key    = DoubleBraceTemplate.getString(keyExpression, values);
		const script = DoubleBraceTemplate.getString(scriptExpression, values);
		scripts[key] = script;
	});
}

const packageJson = cwdRequire('package.json');

packageJson.scripts = scripts;

cwdWriteJson('package.json', packageJson);
