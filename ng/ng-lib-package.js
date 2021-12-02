const GLOB          = require("glob");
const cwdDirExists  = require("../utils/cwd-dir-exists");
const cwdFileExists = require("../utils/cwd-file-exists");
const cwdRequire    = require("../utils/cwd-require");
const cwdWriteJson  = require("../utils/cwd-write-json");
const ngProjects    = require("./utils/ng-projects");

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

			const subNgPackageJson = cwdFileExists(dir, 'ng-package.json') ?
				cwdRequire(dir, 'ng-package.json') :
				{
					"$schema": "../../../../node_modules/ng-packagr/ng-package.schema.json",
					"lib"    : {
						"entryFile"        : "public-api.ts",
						"styleIncludePaths": [
							"../../../../node_modules"
						]
					}
				}


			cwdWriteJson(dir, 'ng-package.json', subNgPackageJson);

			console.groupEnd();
		});

	console.groupEnd();
});
