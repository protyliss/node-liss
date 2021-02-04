const INQUIRER = require('inquirer');
const ngProjects = require("./ng-projects");

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
			const project = projects[name];
			return Promise.resolve({key, project});
		});
}

module.exports = ngPromptSelectLibrary;
