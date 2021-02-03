const getConfigure = require('../core/get-configure.js');
const ngProjects   = require('./utils/ng-projects.js');
const cwdRequire   = require('../utils/cwd-require.js');
const cwdWriteJson = require('../utils/cwd-write-json.js');
console.log('Optimize tslint.json');

const configure = getConfigure({
	ng: {
		optimizeTslint: null
	}
});

if (!configure.ng.optimizeTslint) {
	console.error('configure `ng.optimizeTslint` is required.');
	process.exit();
}

const jobConfigure = configure.ng.optimizeTslint;

const regexpMap = Object.entries(jobConfigure).reduce((map, [conditions, selector]) => {
	return map.concat([
		[
			new RegExp(
				conditions
					.replace(/([/\\*+?])/g, '\\$'),
			),
			selector
		]
	]);
}, []);

const properties = ['directive-selector', 'component-selector'];

ngProjects().forEach(([key, project]) => {
	const {root} = project;

	const tslintJson = cwdRequire(root, 'tslint.json');
	const {rules}    = tslintJson;

	regexpMap.some(([regexp, selector]) => {
		if (!regexp.test(key)) {
			return;
		}
		properties.forEach(property => {
			if (rules[property].indexOf(selector) === -1) {
				rules[property].push(selector);
			}
		});

		console.log(key, rules);
		return true;
	});

	cwdWriteJson(root, 'tslint.json', tslintJson);
});
