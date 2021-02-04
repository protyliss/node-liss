const ngProjects = require("./utils/ng-projects");
const cwdFileExists = require("../utils/cwd-file-exists");
const setVersionByTime = require("../core/set-version-by-time");
const getFilesLastModifiedTime = require("../core/get-files-last-modified-time");


Object.entries(ngProjects('library')).forEach(([key, project]) => {
	const {root, sourceRoot} = project;

	if (!cwdFileExists(root, 'package.json')) {
		return;
	}

	const lastModifiedTime = getFilesLastModifiedTime(sourceRoot);

	console.group(key);
	setVersionByTime(lastModifiedTime, root, 'package.json');
	console.groupEnd();
});
