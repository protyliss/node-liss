const PROCESS  = require('process');
const PATH     = require('path');
const GLOB     = require('glob');
const INQUIRER = require('inquirer');

console.log('Angular!');

const [job] = process.argv.slice(2);

function run(jobFile) {
	require(jobFile);
}

if (!job) {
	let jobList = GLOB.sync(__dirname + '/*.js');

	jobList = jobList.reduce((map, job) => {
		if (job.endsWith('liss.js')) {
			return map;
		}

		const prefix = 'ng-';
		let key      = PATH.basename(job)
		key          = key.substring(prefix.length, key.length - 3);
		map[key]     = job;

		return map;
	}, {});

	const jobKeys = Object.keys(jobList).sort();
	if (jobKeys.length === 1) {
		console.log('Auto Select');
		run(jobList[jobKeys[0]]);
	} else {
		INQUIRER.prompt([
			{
				type   : 'list',
				name   : 'job',
				message: 'Select the job',
				choices: jobKeys
			}
		])
			.then(answers => {
				const {job} = answers;

				const jobFile = jobList[job];
				run(jobFile);
			});
	}
}

