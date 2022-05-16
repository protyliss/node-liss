const ngProjects         = require("./utils/ng-projects");
const cwdRequire         = require("../utils/cwd-require");
const cwdFileExists      = require("../utils/cwd-file-exists");
const cwdWriteJson       = require("../utils/cwd-write-json");
const getTsImportModules = require("../ts/utils/get-ts-import-modules");
const {underline}        = require('../decorate.js');

console.log(underline`Update peerDependencies from Source`);

const packageJson = cwdRequire('package.json');

/**
 * @type {Object.<string, string>}
 */
const dependencies = packageJson.dependencies;

const libraryVersions = Object.entries(dependencies).reduce((
		versions,
		[packageName, version]) => {
		if (/^.?\d/.test(version)) {
			version[packageName] = parseInt(version) + '.x';
		}
		return versions;
	},
	{}
);

Object.entries(ngProjects('library')).forEach(([key, project]) => {
	const {root} = project;
	if (!cwdFileExists(root, 'package.json')) {
		console.warn(root, ' has not package.json');
		return;
	}

	const version        = cwdRequire(project.root, 'package.json').version;
	const first          = version.charAt(0);
	// noinspection EqualityComparisonWithCoercionJS
	libraryVersions[key] = first == +first ? '^' + version : version;
});

console.info(libraryVersions);

Object.entries(ngProjects()).forEach(([key, project]) => {
	const {root, sourceRoot} = project;

	if (!cwdFileExists(root, 'package.json')) {
		return;
	}

	const peerDependencies = getTsImportModules(sourceRoot)
		.reduce((di, module) => {
				if (module.startsWith('rxjs')) {
					return di;
				}

				if (module.startsWith(key)) {
					console.warn(key + ' has self referenced path.')
					return di;
				}

				const version = libraryVersions[module];
				if (version) {
					di[module] = version;
				}
				return di;
			},
			{}
		);

	console.log(key, peerDependencies);

	const projectPackageJson            = cwdRequire(root, 'package.json');
	projectPackageJson.peerDependencies = peerDependencies;

	cwdWriteJson(root, 'package.json', projectPackageJson);
});
