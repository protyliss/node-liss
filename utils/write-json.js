const FS = require('fs');

function writeJson(path, data) {
	FS.writeFileSync(path, JSON.stringify(data, null, 2));
}

module.exports = writeJson;
