#!/usr/bin/env node

const cwdFileExists = require('./utils/cwd-file-exists.js');
const getParameter = require('./utils/get-parameter');
const packageJson = require('./package.json');

console.log('LISS in the Command line');
console.log(packageJson.version);

function run(platform) {
	const detectFiles = {
		ng  : 'angular.json',
		ts  : 'tsconfig.json',
		node: 'package.json'
	}
	const detectedFiles = {};

	Object.keys(detectFiles).some(_platform => {
		const file = detectFiles[_platform];
		if (cwdFileExists(file)) {
			detectedFiles[_platform] = true;
			if (!platform) {
				platform = _platform;
			}
		}
	});

	if (platform) {
		if (detectedFiles[platform]) {
			switch (platform) {
				case 'ng':
					return require('./ng/liss.js');
				case 'ts':
					return require('./ts/liss.js');
				case 'node':
					return require('./node/liss.js');
			}
		} else {
			console.warn(`'${detectFiles[platform]}' file is required.`);
			return;
		}
	}

	console.warn('Cannot Found Supported Platform');
}


run(
	getParameter({
		matches: ['node', 'ts', 'ng'],
	})
);
