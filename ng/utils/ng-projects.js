const cwdRequire = require('../../utils/cwd-require.js');

function ngProjects(){
	return cwdRequire('angular.json').projects;
}

module.exports = ngProjects;
