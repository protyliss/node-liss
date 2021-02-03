const cwdFileExists = require('../utils/cwd-file-exists.js');
const cwdRequire    = require('../utils/cwd-require.js');

function getConfigure(defaultConfigure) {
	return {
		...defaultConfigure,
		...(
			cwdFileExists('liss.json') ? cwdRequire('liss.json') : {}
		)
	}
}

module.exports = getConfigure;
