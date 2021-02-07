const PATH = require('path');
const GLOB = require('glob');
const INQUIRER = require('inquirer');

INQUIRER.registerPrompt('checkbox-plus', require('inquirer-checkbox-plus-prompt'));
INQUIRER.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

/**
 *
 * @param {string | string[]} dirs __dirname
 */
function selectJob(dirs, autoSelect = false) {
	if (!Array.isArray(dirs)) {
		dirs = [dirs];
	}
	const jobList = dirs.reduce(
		(list, dir, index) => {

			const prefix = index && dirs.length > 1 ?
				'' :
				PATH.basename(dir) + '-';

			const prefixLength = prefix.length;

			GLOB.sync(dir + '/*.js')
				.forEach(file => {
					if (file.endsWith('liss.js')) {
						return list;
					}

					let key = PATH.basename(file)
					key = key.substring(prefixLength, key.length - 3);
					list[key] = file;
				});

			return list;
		},
		{}
	);

	const jobNames = Object.keys(jobList);

	if (autoSelect && jobNames.length === 1) {
		const jobFile = jobList[jobNames[0]]
		console.log('Auto Selected: ', jobNames[0]);
		require(jobFile);
	} else {
		INQUIRER.prompt([
			{
				type: 'autocomplete',
				name: 'job',
				message: 'LISS will work for you',
				choices: jobNames,
				source(answersSoFar, input) {
					return Promise.resolve(input ?
						jobNames.filter(name => name.indexOf(input) > -1) :
						jobNames
					);
				}
			}
		])
			.then(answers => {
				const {job} = answers;

				const jobFile = jobList[job];
				require(jobFile);
			})
	}

}

module.exports = selectJob;
