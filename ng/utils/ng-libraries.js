const ngProjects = require('./ng-projects.js');

function ngLibraries(){
	const projects = ngProjects();
	return Object.keys(projects).reduce((map, key) => {
		const project = projects[key];
		if(project.projectType === 'library'){
			map[key] = project;
		}
		return map;
	}, {});
}

module.exports = ngLibraries;
