const INQUIRER = require('inquirer');
const ngProjects = require("../utils/ng-projects");

/**
 * @param {null | 'application' | 'library'} type
 * @param {boolean} multiple
 * @param {boolean} requireConfirm
 * @returns {Promise<Array.<string, {}>>}
 */
function ngPromptSelectProject({type, multiple, requireConfirm} = {}) {
	const projects = ngProjects(type);

	const names = Object.keys(projects);

	const SELECT_ALL = 'All Projects';
	const questions = [];

	function source(answersSoFar, input) {
		return Promise.resolve(
			input ?
				names.filter(name => name.indexOf(input) > -1) :
				names
		);
	}

	if (multiple) {
		names.unshift(SELECT_ALL);
		questions.push(
			{
				type: 'checkbox-plus',
				name: 'keys',
				message: 'Select Angular Projects',
				choices: names,
				searchable: true,
				highlight: true,
				source
			}
		)
	} else {
		questions.push(
			{
				type: 'autocomplete',
				name: 'keys',
				message: 'Select Angular Project',
				choices: names,
				source
			}
		)
	}

	if (requireConfirm) {
		questions.push(
			{
				type: 'confirm',
				name: 'confirm',
				message: 'Are you Sure?',
			}
		);
	}

	return INQUIRER.prompt(questions)
		.then(answers => {
			let {keys, confirm} = answers;

			if (!Array.isArray(keys)) {
				keys = [keys];
			}

			return !requireConfirm || confirm ?
				Promise.resolve(
					multiple ?
						Object.entries(
							keys.indexOf(SELECT_ALL) > -1 ?
								projects :
								keys.reduce(
									(map, key) => {
										const project = projects[key];
										if (!project) {
											throw new RangeError(`${key} is not a project key`);
										}
										map[key] = project;

										return map;
									},
									{})
						) :
						[keys[0], projects[keys[0]]]
				) :
				Promise.reject('Did not confirmed');
		});
}

module.exports = ngPromptSelectProject;
