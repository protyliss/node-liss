const cwdRequire = require('../../utils/cwd-require.js');

/**
 *
 * @param {null | 'application' | 'library'} filterType
 * @returns [[string, Object.<string, any>>>
 */
function ngProjects(filterType = null) {
	const {projects} = cwdRequire('angular.json');

	let entries = Object.entries(projects);

	if (filterType) {
		entries = entries.filter(
			([key, project]) => {
				return project.projectType === filterType;
			}
		)
	}

	return entries
		.sort(entrySortFunction)
		.reduce(
			(map, [key, project]) => {
				map[key] = project;
				return map;
			},
			{}
		);
}

function entrySortFunction(a, b) {
	return a[0].localeCompare(b[0]);
}


module.exports = ngProjects;
