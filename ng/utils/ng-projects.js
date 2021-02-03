const cwdRequire = require('../../utils/cwd-require.js');

/**
 *
 * @returns Object.<{projectType: string}>
 */
function ngProjects(){
	return cwdRequire('angular.json').projects;
}

module.exports = ngProjects;
