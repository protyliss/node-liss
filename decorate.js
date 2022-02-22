function box(value) {
	value          = value.join('');
	const {length} = value;
	return [
		`┌─${'─'.repeat(length)}─┐`,
		'│ ' + ((((value)))) + ' │',
		`└─${'─'.repeat(length)}─┘`,
	].join('\n');
}

function heading(value) {
	value      = value.join('');
	const line = '='.repeat(value.length);
	return [line, value, line].join('\n');
}

function underline(value) {
	value = value.join('');
	return [value, '-'.repeat(value.length)].join('\n');
}

module.exports = {
	box,
	heading,
	underline
}
