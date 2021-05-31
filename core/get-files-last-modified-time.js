const FS            = require('fs');
const GLOB          = require('glob');
const cwdFileExists = require("../utils/cwd-file-exists");
const _IGNORE       = /node_modules|\.[^\/]+|package-lock\.json/;

function getFilesLastModifiedTime(...dirs) {
	const mtimes = dirs.reduce((_mtimes, dir) => {
			if (_IGNORE.test(dir)) {
				return _mtimes;
			}

			console.group(dir);

			const prefix = dir.endsWith('/') ? dir.substr(0, dir.length - 1) : dir;

			_mtimes = GLOB.sync(prefix + '/**/*').reduce((__mtimes, lowerItem) => {
				if (_IGNORE.test(lowerItem)) {
					return _mtimes;
				}

				_mtimes.push(getDate(lowerItem))
				return _mtimes;
			}, _mtimes);

			console.groupEnd();
			return _mtimes;
		}, []
	);

	return Math.max.apply(this, mtimes);
}

function getDate(file) {
	;
	return (new Date(FS.lstatSync(file).mtime)).getTime();
}

module.exports = getFilesLastModifiedTime;
