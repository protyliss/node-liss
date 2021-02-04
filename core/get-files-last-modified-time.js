const FS = require('fs');
const GLOB = require('glob');
const cwdFileExists = require("../utils/cwd-file-exists");
const _IGNORE = /node_modules|\.[^\/]+|package-lock\.json/g;

function getFilesLastModifiedTime(...dirs) {
	return Math.max.apply(
		this,
		dirs.reduce((mtimes, dir) => {
				const prefix = dir.endsWith('/') ? dir.substr(0, dir.length - 1) : dir;

				return GLOB.sync(prefix + '/*').reduce((_mtimes, lowerItem) => {
					if (_IGNORE.test(lowerItem)) {
						return mtimes;
					}

					if (cwdFileExists(lowerItem)) {
						mtimes.push(getDate(lowerItem))
						return mtimes;
					}

					return _mtimes.concat(
						GLOB.sync(lowerItem + '/**/*', {
							nodir: true
						}).map(getDate)
					)
				}, mtimes);
			}, []
		)
	);
}

function getDate(file) {
	return (new Date(FS.lstatSync(file).mtime)).getTime();
}

module.exports = getFilesLastModifiedTime;
