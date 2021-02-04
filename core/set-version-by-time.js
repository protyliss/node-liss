const cwdRequire = require("../utils/cwd-require");
const getVersionByTime = require("./get-version-by-time");
const cwdWriteJson = require("../utils/cwd-write-json");

function setVersionByTime(time, ...paths) {
	const json = cwdRequire(...paths);
	const [nowMajor, nowMinor, nowFix] = json.version.split('.');

	const [major, minor] = getVersionByTime(time);

	if (nowMajor == major && nowMinor == minor) {
		console.log('Increase Fix Number');
		json.version = [major, minor, Number(nowFix) + 1].join('.');
	} else {
		console.log('Update New Version');
		json.version = [major, minor, 0].join('.');
	}

	console.log(json.version);
	cwdWriteJson(...paths, json);
}

module.exports = setVersionByTime;
