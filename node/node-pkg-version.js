console.log('Set Package Version');

const PATH = require('path');
const PROCESS = require('process');
const FS = require('fs');
const GLOB = require('GLOB');

const cwdFileExists = require("../utils/cwd-file-exists");

const cwdRequire = require("../utils/cwd-require");
const cwdWriteJson = require("../utils/cwd-write-json");

if (!cwdFileExists('package.json')) {
	process.exit('Cannot found package.json');
}

const packageJson = cwdRequire('package.json');
const [nowMajor, nowMinor, nowFix] = packageJson.version.split('.');

const lastModifiedTimes = GLOB.sync('*')
	.reduce(
		(files, item) => {
			switch (item) {
				case 'node_modules':
				case 'package-lock.json':
					return files;
			}

			if (cwdFileExists(item)) {
				return files;
			}

			const lowerFiles = GLOB.sync(item + '/**/*');
			return lowerFiles ?
				files.concat(
					lowerFiles.map(file => {
						return new Date(FS.lstatSync(file).mtime).getTime();
					})
				) :
				files;
		},
		[]
	);

const lastModified = new Date(Math.max(...lastModifiedTimes));

const year = lastModified.getFullYear();

const major = String(year).substr(2);

const minor = ((lastDates, month, date) => {
	let current = -1;
	while (++current < month) {
		date += lastDates[current];
	}
	return date;
})
([
		31,
		year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ?
			29 :
			28,
		31,
		30,
		31,
		30,
		31,
		31,
		30,
		31,
		30,
		31
	],
	lastModified.getMonth(),
	lastModified.getDate()
);

// noinspection EqualityComparisonWithCoercionJS
if (nowMajor == major && nowMinor == minor) {
	console.log('Increase Fix Number');
	packageJson.version = [major, minor, Number(nowFix) + 1].join('.');
} else {
	console.log('Update New Version');
	packageJson.version = [major, minor, 0].join('.');
}

console.log(packageJson.version);
cwdWriteJson('package.json', packageJson);
