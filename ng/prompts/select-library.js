const INQUIRER = require('inquirer');
const ngProjects = require("../utils/ng-projects");

function ngPromptSelectLibrary() {
	const projects = ngProjects('library');
	const names = Object.keys(projects);

	return INQUIRER.prompt([
		{
			type: 'list',
			name: 'key',
			message: 'Select Library',
			choices: names
		}
	])
		.then(answers => {
			const {key} = answers;
			const project = projects[key];
			return Promise.resolve({key, project});
		});
}

module.exports = ngPromptSelectLibrary;
