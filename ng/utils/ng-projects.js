const cwdRequire = require('../../utils/cwd-require.js');

/**
 *
 * @returns [[string, Object.<string, any>>>
 */
function ngProjects(){
	const {projects} = cwdRequire('angular.json');

	return Object.entries(projects)
		.sort(entrySortFunction)
}

function entrySortFunction(a, b){
	return a[0].localeCompare(b[0]);
}


module.exports = ngProjects;
