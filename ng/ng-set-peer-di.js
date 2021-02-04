const ngProjects = require("./utils/ng-projects");

const cwdRequire        = require("../utils/cwd-require");
const getTsImportModule = require("../ts/utils/get-ts-import-module");
const cwdFileExists     = require("../utils/cwd-file-exists");
const cwdWriteJson      = require("../utils/cwd-write-json");

console.log('Update peerDependencies from Source')

const packageJson = cwdRequire('package.json');

const libraryVersions = {
	...(packageJson.dependencies || {})
};

Object.entries(ngProjects('library')).forEach(([key, project]) => {
	libraryVersions[key] = cwdRequire(project.root, 'package.json').version;
});

Object.entries(ngProjects()).forEach(([key, project]) => {
	const {root, sourceRoot} = project;

	if (!cwdFileExists(root, 'package.json')) {
		return;
	}

	const peerDependencies = getTsImportModule(sourceRoot)
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
