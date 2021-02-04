const FS = require('fs');
const PATH = require('path');

function removeDir(path) {
	if (!FS.existsSync(path)) {
		return;
	}
	FS.readdirSync(path).forEach((file, index) => {
		const curPath = PATH.join(path, file);
		if (FS.lstatSync(curPath).isDirectory()) {
			removeDir(curPath);
		} else {
			FS.unlinkSync(curPath);
		}
	});
	FS.rmdirSync(path);
}

module.exports = removeDir;
