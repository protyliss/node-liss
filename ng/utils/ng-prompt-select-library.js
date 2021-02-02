const INQUIRER          = require('inquirer');

function ngPromptSelectLibrary() {
	const libraries         = require('./ng-libraries.js')();
	const names = Object.keys(libraries);

	return INQUIRER.prompt([
		{
			type   : 'list',
			name   : 'library',
			message: 'Select Library',
			choices: names
		}
	])
		.then(answers => {
			const {library: name} = answers;
			const library = libraries[name];
			library.name = name;
			return Promise.resolve(library);
		});
}

module.exports = ngPromptSelectLibrary;
