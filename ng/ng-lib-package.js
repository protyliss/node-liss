
const getTsImportModule = require("../ts/utils/get-ts-import-module");
const GLOB = require("glob");
const cwdDirExists = require("../utils/cwd-dir-exists");
const cwdFileExists = require("../utils/cwd-file-exists");
const cwdRequire = require("../utils/cwd-require");
const cwdWriteJson = require("../utils/cwd-write-json");
const ngProjects = require("./utils/ng-projects");

console.log('Set `package.json` for Sub Module in Library');
Object.entries(ngProjects('library')).forEach(([key, project]) => {
	const {root} = project;

	let startIndex = root.length + 1;
	console.group(key);
	GLOB.sync(root + '/*')
		.forEach(dir => {
			if (!cwdDirExists(dir) || !cwdFileExists(dir, 'public-api.ts')) {
				return;
			}

			const subname = dir.substr(startIndex);

			if (subname === 'src') {
				return;
			}

			console.group(subname);

			const subPackageJson = cwdFileExists(dir, 'package.json') ?
					cwdRequire(dir, 'package.json') :
					{
						ngPackage: {
							lib: {
								entryFile: 'public-api.ts'
							}
						}
					};

			const {lib} = subPackageJson.ngPackage;

			lib['umdModuleIds'] = getTsImportModule(dir).reduce((umdIds, module) => {
				umdIds[module] = module;
				return umdIds;
			}, {});

			lib['styleIncludePaths'] = [
				Array.from(
					Array(root.split('/').length + 1))
					.map(_ => '../')
					.join('')
				+ 'node_modules'
			];

			cwdWriteJson(dir, 'package.json', subPackageJson);

			console.log(lib);

			console.groupEnd();
		});

	console.groupEnd(key);
});
