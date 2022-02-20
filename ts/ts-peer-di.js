const cwdRequire         = require('../utils/cwd-require.js');
const glob               = require('glob');
const FS                 = require('fs');
const cwdFileExists      = require('../utils/cwd-file-exists.js');
const PATH               = require('path');
const getTsImportModules = require('./utils/get-ts-import-modules.js');

console.log('Update peerDependencies from Source package.json');

const packageJson = cwdRequire('package.json');
// const tsConfigJson = cwdRequire('tsconfig.json');

if (!cwdFileExists('liss.json')) {
	throw new ReferenceError(`'liss.json' file is Required.`);
}

const lissJson = cwdRequire('liss.json');

const src = lissJson?.ts?.src;
if (!src) {
	throw new ReferenceError(`'src' Property is Required.`);
}

const monoPackageJsonFiles = glob.sync(`${src.endsWith('/') ? src.slice(1) : src}/**/package.json`)

monoPackageJsonFiles.forEach(monoPackageJsonFile => {
	const dirname = PATH.dirname(monoPackageJsonFile);
	if (
		// monoPackageJson.split('/').length > 3 ||
		FS.existsSync(PATH.join(dirname, '../package.json'))
	) {
		return;
	}

	const modules = getTsImportModules(dirname);

	const monoPackageJson = cwdRequire(monoPackageJsonFile);

	const version = monoPackageJson.version || packageJson.version;


	console.dir(monoPackageJsonFile);
	console.log(version);
	console.log(modules);
});


