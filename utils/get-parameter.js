function getParameter({matches, name}) {
	const {argv} = process;
	const first = argv[2];

	if (name && !argv.slice(2).filter(arg => arg.indexOf('--')).length) {
		throw new Error(`[${name}] Parameter is Required`);
	}

	if (first) {
		if (matches && matches.indexOf(first) > -1) {
			argv.splice(2, 1);
			return first;
		} else {
			console.group('Invalid Parameter:', first)
			console.log('Available Value:');
			console.log(matches);
			console.groupEnd();
			process.exit();
		}
	} else {
	}

	return null;
}

module.exports = getParameter;
