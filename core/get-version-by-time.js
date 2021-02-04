function getVersionByTime(time){
	const lastModified = time instanceof Date ?
		time :
		new Date(time);

	const year = lastModified.getFullYear();

	const major = String(year).substr(2);

	const minor = ((lastDates, month, date) => {
		let current = -1;
		while (++current < month) {
			date += lastDates[current];
		}
		return date;
	})
	([
			31,
			year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ?
				29 :
				28,
			31,
			30,
			31,
			30,
			31,
			31,
			30,
			31,
			30,
			31
		],
		lastModified.getMonth(),
		lastModified.getDate()
	);

	return [major, minor];
}

module.exports = getVersionByTime;
