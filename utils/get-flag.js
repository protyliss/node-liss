function getFlag(name, {matches} = {}) {
	const fullName = '--' + name;
	const {argv}   = process;
	let current    = 1;
	const end      = argv.length - 1;
	while (++current <= end) {
		let value = argv[current];

		if (value.startsWith(fullName)) {

			const hasEqual = value.indexOf('=');
			if (hasEqual > -1) {
				const valueIndex = hasEqual + 1;
				if (value.length >= valueIndex) {
					value = value.substr(valueIndex).trim();
				} else {
					return true;
				}
			} else {
				if (current === end || argv[current + 1].startsWith('--')) {
					return true;
				}

				value = argv[current + 1].trim();
			}

			if (matches && matches.indexOf(value) === -1) {
				console.group(`Invalid Flag ${name}`, value);
				console.log('Available Value')
				console.log(matches);
				console.groupEnd()
				process.exit();
			}
			return value;
		}
	}
	return null;
}

module.exports = getFlag;
