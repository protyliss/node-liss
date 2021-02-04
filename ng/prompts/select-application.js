const INQUIRER = require('inquirer');
const ngProjects = require("../utils/ng-projects");

function ngPromptSelectApplication({requiredConfirm} = {}) {
	const projects = ngProjects('application');
	const names = Object.keys(projects);

	return INQUIRER.prompt([
		{
			type: 'list',
			name: 'key',
			message: 'Select Application',
			choices: names
		},
		{
			type: 'confirm',
			name: 'confirm',
			message: 'Are you Sure?',
			when: requiredConfirm
		}
	])
		.then(answers => {
			const {key, confirm} = answers;
			const project = projects[key];
			return !requiredConfirm || confirm ?
				Promise.resolve({key, project}) :
				Promise.reject();
		});
}

module.exports = ngPromptSelectApplication;
