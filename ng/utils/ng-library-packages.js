const PATH          = require('path');
const PROCESS       = require('process');
const GLOB          = require('glob');
const cwdRequire    = require('../../utils/cwd-require.js');
const cwdDirExists  = require('../../utils/cwd-dir-exists.js');
const cwdFileExists = require('../../utils/cwd-file-exists.js');

function ngLibraryPackages(project) {
	const {root} = project;

	const packageJson = cwdRequire(root, 'package.json');
	const {name}      = packageJson;

	const ngPackageJsonFile = project.architect.build.options.project
	const ngPackageJson     = cwdRequire(ngPackageJsonFile);


	const dest = PATH.join(root, ngPackageJson.dest)
		.replace(/\\/g, '/');

	const packages = [];

	packages[name] = {
		sourceRoot     : root,
		distRoot       : dest,
		packageJsonFile: ngPackageJsonFile
	};

	const candidates = GLOB.sync(root + '/*');

	candidates.forEach(candidate => {
		if (!cwdDirExists(candidate)) {
			return
		}

		if (!cwdFileExists(candidate, 'package.json')) {
			return;
		}

		const subname = candidate.replace(root, '');

		packages[name + subname] = {
			sourceRoot     : root + subname,
			distRoot       : dest + subname,
			packageJsonFile: root + subname + '/package.json'
		}
	});

	return packages;
}


module.exports = ngLibraryPackages;
